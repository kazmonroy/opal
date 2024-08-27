import { db } from '@/db';
import { auth } from '@clerk/nextjs/server';

import { redirect } from 'next/navigation';
import ListContainer from './_components/list-container';

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}
async function BoardIdPage({ params }: BoardIdPageProps) {
  const { orgId } = auth();
  if (!orgId) {
    redirect('select-org');
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  });

  return (
    <div className='p-4 w-full h-full overflow-x-auto'>
      <ListContainer boardId={params.boardId} data={lists} />
    </div>
  );
}

export default BoardIdPage;
