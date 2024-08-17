import { TableSchema } from '@/types';
import { TableIcon } from 'lucide-react';
import  { memo } from 'react';

function TableNode({ data }:{data: TableSchema}) {
  return (
    <div className="shadow-md rounded-md bg-white border-2 border-stone-400 min-w-[300px]">
        <div className="flex flex-col">
          <div className="rounded-t-md w-full text-lg font-bold border-b px-4 py-2 bg-muted flex flex-row items-center"><TableIcon className='w-5 h-5 mr-2 text-gray-500'></TableIcon> {data.tableName.toUpperCase()}</div>
          <div className="flex flex-col text-gray-500 py-2 px-4">
            {data.columns.map((it,index) => 
                (<div key={index} className="flex flex-row">
                    <div>{it.name}</div>
                    <div className='ml-auto'>{it.type}</div>
                </div>))}
          </div>
        </div>
    </div>
  );
}

export default memo(TableNode);