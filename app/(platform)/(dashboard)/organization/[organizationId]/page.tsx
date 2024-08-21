import { createBoard } from '@/actions';
import { Button } from '@/components/ui';
import { db } from '@/db';
import Board from './board';
import Form from './form';

async function OrganziationIdPage() {
  const boards = await db.board.findMany();
  return (
    <div className='flex flex-col gap-2'>
      <Form />
      <ul className='flex flex-col gap-2 py-2 w-40'>
        {boards.map((board) => (
          <Board key={board.id} {...board} />
        ))}
      </ul>
    </div>
  );
}

export default OrganziationIdPage;
