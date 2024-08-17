import { TableSchema } from '@/types';
import  { memo } from 'react';

function TableNode({ data }:{data: TableSchema}) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex">
        <div className="ml-2">
          <div className="text-lg font-bold">{data.tableName}</div>
          <div className="text-gray-500">columns</div>
        </div>
      </div>
    </div>
  );
}

export default memo(TableNode);