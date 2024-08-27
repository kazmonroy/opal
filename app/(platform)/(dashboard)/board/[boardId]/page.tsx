import { db } from '@/db';
import { auth } from '@clerk/nextjs/server';
import { orderBy } from 'lodash';
import { redirect } from 'next/navigation';

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

  return <div className='p-4 w-full h-full overflow-x-auto'>Board Id!</div>;
}

export default BoardIdPage;
