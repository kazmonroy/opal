'use server';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';

export async function deleteBoard(id: string) {
  await db.board.delete({ where: { id } });

  revalidatePath('/organization/org_2kqEZ54g9lVMBoeyeT7hDpyYjdB');
}
