import { Board } from '@prisma/client';
import BoardTitleForm from './board-title-form';

interface BoardNavbarProps {
  data: Board;
}

async function BoardNavbar({ data }: BoardNavbarProps) {
  return (
    <div className='absolute w-full h-14 z-[40] bg-black/50 top-14 flex items-center px-6 gap-x-6 text-slate-50'>
      <BoardTitleForm data={data} />
    </div>
  );
}

export default BoardNavbar;
