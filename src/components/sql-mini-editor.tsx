import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { CompletionContext, autocompletion, CompletionResult } from '@codemirror/autocomplete';
import {  Select, AST, Parser } from 'node-sql-parser';

interface SQLEditorProps {
  allowedTables: string[];
  tableColumns: Record<string, string[]>;
}

interface ASTNode {
    type?: string;
    table?: string;
    left?: ASTNode;
    right?: ASTNode;
    from?: ASTNode[];
  }

const SQLMiniEditor: React.FC<SQLEditorProps> = ({ allowedTables, tableColumns }) => {
  const [query, setQuery] = useState('');
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
      const extractTables = (node: ASTNode) => {
        if (node.table) usedTables.add(node.table);
        if (node.left) extractTables(node.left);
        if (node.right) extractTables(node.right);
      };

      if (Array.isArray(ast)) {
        ast.forEach(a => {
          if (checkSelectQuery(a) && a.from && a.from[0]) extractTables(a.from[0] as ASTNode);
        });
      } else {
        if (checkSelectQuery(ast) && ast.from && ast.from[0]) extractTables(ast.from[0] as ASTNode);
      }

      // Check for allowed tables
      const invalidTables = Array.from(usedTables).filter(table => !allowedTables.includes(table));
      if (invalidTables.length > 0) {
        throw new Error(`Invalid tables used: ${invalidTables.join(', ')}`);
      }

      setQuery(value);
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message to user)
    }
  };

  const myCompletions = (context: CompletionContext): CompletionResult | null => {
    const before = context.matchBefore(/\w+\.\w*/);
    if (!before) {
      return {
        from: context.pos,
        options: allowedTables.map(table => ({
          label: table,
          type: 'type'
        }))
      };
    }

    const [table] = before.text.split('.');
    if (tableColumns[table]) {
      return {
        from: before.from + before.text.lastIndexOf('.') + 1,
        options: tableColumns[table].map(column => ({
          label: column,
          type: 'variable'
        }))
      };
    }

    return null;
  };

  return (
    <CodeMirror
      value={query}
      height="200px"
      extensions={[
        sql(),
        autocompletion({ override: [myCompletions] })
      ]}
      onChange={(value) => validateQuery(value)}
    />
  );
};

export default SQLMiniEditor;