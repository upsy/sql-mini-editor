import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { githubLight } from '@uiw/codemirror-theme-github';
import { sql } from '@codemirror/lang-sql';
import { CompletionContext, autocompletion, CompletionResult, Completion } from '@codemirror/autocomplete';
import {  Select, AST, Parser } from 'node-sql-parser';
import { AlertDestructive } from './alert-destructive';

interface SQLEditorProps {
  currentQuery: string;
  allowedTables: string[];
  tableColumns: Record<string, string[]>;
  onQueryChange: (newQuery:string)=>void;
}

interface ASTNode {
    type?: string;
    table?: string;
    left?: ASTNode;
    right?: ASTNode;
    from?: ASTNode[];
    as?:string;
  }

const SQLMiniEditorTextarea: React.FC<SQLEditorProps> = ({ currentQuery, allowedTables, tableColumns, onQueryChange }) => {
  const [error, setError] = useState('');
  const [queryTables, setQueryTables] = useState<{ [alias: string]: string }>({});
  const parser = new Parser();


  const sqlKeywords = [
    'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN',
    'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'OFFSET', 'UNION', 'INTERSECT', 'EXCEPT'
  ];

  const validateQuery = (value: string) => {
    try {
      const ast = parser.astify(value);
      
      // Check if it's a SELECT query
      const checkSelectQuery = (ast: AST) : ast is Select=> {
        if (ast.type !== 'select') {
          setError('Only SELECT queries are allowed');
          throw new Error('Only SELECT queries are allowed');
        }
        return true;
      };

      // Handle both single AST and array of ASTs
      if (Array.isArray(ast)) {
        ast.forEach(checkSelectQuery);
      } else {
        checkSelectQuery(ast);
      }

      // Extract all table names from the query (including joins)
      const usedTables = new Set<string>();
      const extractTables = (node: ASTNode | ASTNode[]) => {

        if (Array.isArray(node)) {
            node.forEach( nodeItem => extractTables(nodeItem));
            return;
        }

        if (node.table) usedTables.add(node.table);
        if (node.left) extractTables(node.left);
        if (node.right) extractTables(node.right);
      };

      if (Array.isArray(ast)) {
        ast.forEach(a => {
          if (checkSelectQuery(a) && a.from && a.from[0]) extractTables(a.from as ASTNode[]);
        });
      } else {
        if (checkSelectQuery(ast) && ast.from && ast.from[0]) extractTables(ast.from as ASTNode[]);
      }

      // Check for allowed tables
      const invalidTables = Array.from(usedTables).filter(table => !allowedTables.includes(table));
      if (invalidTables.length > 0) {
        setError(`Invalid tables used: ${invalidTables.join(', ')}`);
        throw new Error(`Invalid tables used: ${invalidTables.join(', ')}`);
      }

      onQueryChange(value);
      setQueryTables(getTablesFromQuery(ast));
      setError('');
    } catch (err) {
        if (err instanceof Error && err?.name == "SyntaxError"){
            setError('Invalid Query!');
        }
    //   console.error(err);
      // Handle error (e.g., show error message to user)
    }

    
  };

  const getTablesFromQuery = (ast: AST | AST[]): { [alias: string]: string } => {
    const tables: { [alias: string]: string } = {};
    
    const processFrom = (from:  ASTNode | ASTNode[]) => {
      
      if (Array.isArray(from)) {
        from.forEach(fromItem => processFrom(fromItem));
        return;
    }
    
      if (from.table) {
        tables[from.as || from.table] = from.table;
      }
      if (from.left) processFrom(from.left);
      if (from.right) processFrom(from.right);
    };

    if (Array.isArray(ast)) {
      ast.forEach(a => {
        if (a.type === 'select' && a.from) {
          processFrom(a.from as ASTNode[]);
        }
      });
    } else if (ast.type === 'select' && ast.from) {
      processFrom(ast.from as ASTNode[]) ;
    }

    return tables;
  };

  const myCompletions = (context: CompletionContext): CompletionResult | null => {
    // const beforeDot = context.matchBefore(/(\w+)\.\w*$/);
    const beforeDot = context.matchBefore(/(\w+)\.(\w*)$/);

    const beforeWord = context.matchBefore(/\w+$/);
    const word = beforeWord?.text.toLowerCase() || '';
  
    const tables = queryTables;
    const columnCompletions: Completion[] = [];
    let isSelectContext = false;
    let multipleTablesUsed = false;
    
    // Try to parse the query
    try {
      // const ast = parser.astify(context.state.doc.toString());
      // tables = getTablesFromQuery(ast);
  
      // Check if we're in a SELECT context
      const cursorPos = context.pos;
      const docText = context.state.doc.toString();
      const selectIndex = docText.toLowerCase().lastIndexOf('select', cursorPos);
      const fromIndex = docText.toLowerCase().indexOf('from', selectIndex);
      isSelectContext = selectIndex !== -1 && (fromIndex === -1 || cursorPos < fromIndex);
  
      // Check if multiple tables are used
      multipleTablesUsed = Object.keys(tables).length > 1;
      // Generate column completions based on tables in the query
      Object.entries(tables).forEach(([alias, tableName]) => {
        if (tableColumns[tableName]) {
          columnCompletions.push(...tableColumns[tableName].map(column => ({
            // label: isSelectContext ? column : `${alias}.${column}`,
            label: (isSelectContext && multipleTablesUsed) ? `${alias}.${column}` : isSelectContext ? column : `${alias}.${column}`,
            type: 'property'
          })));
        }
      });
    } catch (err) {
      console.log(">> ignored err", err);
      // If parsing fails, fall back to suggesting all columns from all allowed tables
      allowedTables.forEach(table => {
        if (tableColumns[table]) {
          columnCompletions.push(...tableColumns[table].map(column => ({
            label: `${table}.${column}`,
            type: 'property'
          })));
        }
      });
    }
  
    // Handle dot notation for table/alias
    // if (beforeDot) {
    //   const [, tableName] = beforeDot.text.split('.');
    //   const actualTable = tables[tableName] || tableName;
    //   if (tableColumns[actualTable]) {
    //     return {
    //       from: beforeDot.to,
    //       options: tableColumns[actualTable].map(column => ({
    //         label: column,
    //         type: 'property'
    //       })),
    //       validFor: /^\w*$/
    //     };
    //   }
    //   return null;
    // }

    if (beforeDot) {
      const [tableName, partial] = beforeDot.text.split('.');
      // debugger;
      const actualTable = tables[tableName] || tableName;
      if (tableColumns[actualTable]) {
        return {
          from: beforeDot.from + tableName.length + 1,
          options: tableColumns[actualTable]
            .filter(column => column.toLowerCase().startsWith(partial.toLowerCase()))
            .map(column => ({
              label: column,
              type: 'property'
            })),
          validFor: /^\w*$/
        };
      }
    }
  
    // Suggest SQL keywords
    const keywordCompletions = sqlKeywords
      .filter(kw => kw.toLowerCase().startsWith(word))
      .map(kw => ({ label: kw, type: 'keyword' }));
  
    // Suggest table names
    const tableCompletions = allowedTables
      .filter(table => table.toLowerCase().startsWith(word))
      .map(table => ({ label: table, type: 'type' }));
  
    // Determine which completions to show based on context
    let allCompletions: Completion[];
    if (isSelectContext) {
      allCompletions = columnCompletions;
    } else {
      allCompletions = [...tableCompletions, ...columnCompletions, ...keywordCompletions];
    }
  
    // Filter completions based on the current word
    allCompletions = allCompletions.filter(completion => 
      completion.label.toLowerCase().startsWith(word)
    );
  
    if (allCompletions.length > 0) {
      return {
        from: beforeWord ? beforeWord.from : context.pos,
        options: allCompletions,
        validFor: /^\w*$/
      };
    }
  
    return null;
  };

  return (
    <>
    <div className='border mb-2'>
        <CodeMirror
        value={currentQuery}
        height="200px"
        extensions={[
            sql(),
            autocompletion({ override: [myCompletions] , closeOnBlur:false})
        ]}
       
        theme={githubLight}
        onChange={(value) => validateQuery(value)}
        />
    </div>
    {/* <span className='text-destructive text-sm'>{error}</span> */}
    <AlertDestructive>{error}</AlertDestructive>
    </>
  );
};

export default SQLMiniEditorTextarea;