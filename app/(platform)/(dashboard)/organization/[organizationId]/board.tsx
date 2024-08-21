import { deleteBoard } from '@/actions';
import { Button } from '@/components/ui';

async function Board({ title, id }: { title: string; id: string }) {
  const onDeleteBoard = deleteBoard.bind(null, id);
  return (
    <form action={onDeleteBoard} className=''>
      <li className='flex gap-4'>
        <p className='flex-1'> {title}</p>

        <Button size='sm' variant='destructive' type='submit'>
          Delete
        </Button>
      </li>
    </form>
  );
}

export default Board;
