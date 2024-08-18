import {
  ReactFlow,
  useNodesState,
  MiniMap,
  Controls,
  useNodesInitialized,
  ReactFlowInstance,
} from '@xyflow/react';

import '@xyflow/react/dist/base.css';
import { TableSchema } from '@/types';

import TableNode from '@/components/db-schema-table-node';
import { useEffect, useState } from 'react';

const nodeTypes = {
  custom: TableNode,
};

function initializeStartingNodes(dbSchema: TableSchema[]) {
  return dbSchema.map((it, index) => {
    return ({
      id: index + '',
      type: 'custom',
      data: it,
      position: { x: index * 350, y: 0 },
    })
  });
}

export const DbSchemaViewer = ({ dbSchema }: { dbSchema: TableSchema[] }) => {

  // console.log(">> DbSchemaViewer", dbSchema);
  const [nodes, setNodes] = useNodesState(initializeStartingNodes(dbSchema));
  // const nodesInitialized = useNodesInitialized();
  useEffect(() => {
    if (nodes.length != initializeStartingNodes(dbSchema).length) {
      setNodes(initializeStartingNodes(dbSchema));
      setTimeout(() => {
        if (reactFlowInstance && nodes?.length) {
          reactFlowInstance.fitView();
        }

      }, 100)
    }
  }, [dbSchema, setNodes, nodes?.length]);

  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();

  const onInit = (rf: ReactFlowInstance) => {
    setReactFlowInstance(rf);
  };

  // useEffect(() => {
  // if (nodesInitialized) {
  // if (reactFlowInstance && nodes?.length) {
  //   // reactFlowInstance.fitView();
  // }
  // }
  // }, [nodesInitialized]);


  return (
    <ReactFlow
      onInit={onInit}
      nodes={nodes}
      nodeTypes={nodeTypes}
      fitView
      className="bg-mutted"
    >
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
};