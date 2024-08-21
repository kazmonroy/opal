import { deleteBoard } from '@/actions';
import FormDeleteButton from './form-delete';

function Board({ title, id }: { title: string; id: string }) {
  const onDeleteBoard = deleteBoard.bind(null, id);
  return (
    <form action={onDeleteBoard} className=''>
      <li className='flex gap-4'>
        <p className='flex-1'> {title}</p>
        <FormDeleteButton />
      </li>
    </form>
  );
}

export default Board;
