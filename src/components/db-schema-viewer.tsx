import {
  ReactFlow,
  useNodesState,
  MiniMap,
  Controls,
} from '@xyflow/react';

import '@xyflow/react/dist/base.css';
import { TableSchema } from '@/types';

import TableNode from '@/components/db-schema-table-node';

const nodeTypes = {
  custom: TableNode,
};

function initializeStartingNodes( dbSchema:TableSchema[] ){
    return dbSchema.map((it, index)=>{
        return  ({
            id: index+'',
            type: 'custom',
            data: it,
            position: { x: 0, y: 50 },
          })
    });
}

export const DbSchemaViewer = ({dbSchema}:{dbSchema:TableSchema[]}) => {
    const [nodes] = useNodesState(initializeStartingNodes(dbSchema));
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