import {
  ReactFlow,
  useNodesState,
  MiniMap,
  Controls,
} from '@xyflow/react';

import '@xyflow/react/dist/base.css';
import { TableSchema } from '@/types';

import TableNode from '@/components/db-schema-table-node';
import { useEffect } from 'react';

const nodeTypes = {
  custom: TableNode,
};

function initializeStartingNodes( dbSchema:TableSchema[] ){
    return dbSchema.map((it, index)=>{
        return  ({
            id: index+'',
            type: 'custom',
            data: it,
            position: { x: index*350, y: 0 },
          })
    });
}

export const DbSchemaViewer = ({dbSchema}:{dbSchema:TableSchema[]}) => {

    console.log(">> DbSchemaViewer", dbSchema);
    const [nodes, setNodes] = useNodesState(initializeStartingNodes(dbSchema));

    useEffect(()=>{
        if (nodes.length != initializeStartingNodes(dbSchema).length){
            setNodes(initializeStartingNodes(dbSchema))
        }
    },[dbSchema,setNodes,nodes.length]);

    return (
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        fitView
        className="bg-sky-50"
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    );
  };