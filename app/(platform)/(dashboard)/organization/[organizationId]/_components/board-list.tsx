import { User2 } from 'lucide-react';

function BoardList() {
  return (
    <div className='space-y-4'>
      <div className='flex items-center font-semibold font-lg text-slate-700'>
        <User2 className='h-6 w-6 mr-2' />
        <p>Your boards!</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 '>
        <div
          role='button'
          className='aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center p-4 hover:opacity-75 transition'
        >
          <p className='text-sm'>Create new board</p>
          <span className='text-sm'>5 remaining</span>
        </div>
      </div>
    </div>
  );
}

export default BoardList;
