import { Board } from '@prisma/client';

interface BoardNavbarProps {
  data: Board;
}

async function BoardNavbar({ data }: BoardNavbarProps) {
  return (
    <div className='absolute w-full h-14 z-[40] bg-black/50 top-14 flex items-center px-6 gap-x-6 text-slate-50'>
      Board Navbar!
    </div>
  );
}

export default BoardNavbar;
