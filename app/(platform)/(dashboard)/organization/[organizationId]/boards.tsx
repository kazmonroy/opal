import { db } from '@/db';

async function Boards() {
  const boards = await db.board.findMany();
  return (
    <ul>
      {boards.map((b) => (
        <li key={b.id}>{b.title}</li>
      ))}
    </ul>
  );
}

export default Boards;
