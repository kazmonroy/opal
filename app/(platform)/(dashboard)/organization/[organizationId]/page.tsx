import { Suspense } from 'react';
import Info from './_components/info';
import { Separator } from '@/components/ui';
import BoardList from './_components/board-list';

async function OrganziationIdPage() {
  return (
    <div className='w-full mb-20'>
      <Info />
      <Separator className='my-4' />
      <div className='px-2 mb:px-4'>
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
}

export default OrganziationIdPage;
