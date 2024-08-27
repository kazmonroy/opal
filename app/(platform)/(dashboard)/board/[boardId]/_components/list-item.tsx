'use client';

import { ListWithCards } from '@/types';

interface ListItemProps {
  data: ListWithCards;
  index: number;
}
function ListItem({ data, index }: ListItemProps) {
  return (
    <li className='shrink-0 h-full w-[17rem] select-none'>
      <div className='w-full rounded-md bg-slate-500 shadow-md pb-2'>
        {data.title}
      </div>
    </li>
  );
}

export default ListItem;
