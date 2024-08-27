import { Board } from '@prisma/client';
import BoardTitleForm from './board-title-form';
import BoardOptions from './board-options';

interface BoardNavbarProps {
  data: Board;
}

async function BoardNavbar({ data }: BoardNavbarProps) {
  return (
    <div className='absolute w-full h-14 z-[40] bg-black/50 top-14 flex items-center px-6 gap-x-6 text-slate-50'>
      <BoardTitleForm data={data} />
      <div className='ml-auto'>
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
}

export default BoardNavbar;
