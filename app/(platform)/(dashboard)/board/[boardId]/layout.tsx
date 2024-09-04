import { auth } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';
import { db } from '@/db';
import { startCase } from 'lodash';
import BoardNavbar from './_components/board-navbar';

interface BoardIdLayoutProps {
  children?: React.ReactNode;
  params: {
    boardId: string;
  };
}

const getBoard = (boardId: string, orgId: string) => {
  return db.board.findUnique({
    where: { id: boardId, orgId },
  });
};

export async function generateMetadata({ params }: BoardIdLayoutProps) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: 'Board',
    };
  }

  const board = await getBoard(params.boardId, orgId);

  return {
    title: startCase(board?.title || 'Board'),
  };
}

async function BoardIdLayout({ children, params }: BoardIdLayoutProps) {
  const { orgId } = auth();
  const { boardId } = params;

  if (!orgId) {
    redirect('select-org');
  }
  const board = await getBoard(boardId, orgId);

  if (!board) {
    notFound();
  }

  const {
    title,
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageUserName,
    imageLinkHTML,
  } = board;

  return (
    <div
      className='relative h-full bg-no-repeat bg-cover bg-center'
      style={{ backgroundImage: `url(${imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <main className='relative pt-28 h-full'>{children}</main>
    </div>
  );
}

export default BoardIdLayout;
