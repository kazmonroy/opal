'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { Board } from '@prisma/client';
import { InputType, ReturnType } from './types';
import { deleteBoardSchema } from './schema';
import { createSafeAction } from '@/lib/create-safe-action';
import { db } from '@/db';
import { redirect } from 'next/navigation';

async function hanlder(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'Not Authorized',
    };
  }

  const { id } = data;

  let board: Board;
  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: 'Failed to delete board',
      };
    }
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
}

export const deleteBoard = createSafeAction(deleteBoardSchema, hanlder);