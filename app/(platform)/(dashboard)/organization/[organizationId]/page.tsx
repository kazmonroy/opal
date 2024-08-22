import { db } from '@/db';

async function OrganziationIdPage() {
  const boards = await db.board.findMany();
  return <div className='flex flex-col gap-2'></div>;
}

export default OrganziationIdPage;
