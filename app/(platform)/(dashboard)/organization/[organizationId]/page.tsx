import { db } from '@/db';
import Info from './_components/info';

async function OrganziationIdPage() {
  const boards = await db.board.findMany();
  return (
    <div className='w-full mb-20'>
      <Info />
    </div>
  );
}

export default OrganziationIdPage;
