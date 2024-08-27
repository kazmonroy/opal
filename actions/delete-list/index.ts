'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { List } from '@prisma/client';
import { redirect } from 'next/navigation';
import { InputType, ReturnType } from './types';
import { deleteListSchema } from './schema';
import { createSafeAction } from '@/lib/create-safe-action';
import { db } from '@/db';

async function hanlder(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'Not Authorized',
    };
  }

  const { id, boardId } = data;

  let list: List;
  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: 'Failed to delete list',
      };
    }
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
}

export const deleteList = createSafeAction(deleteListSchema, hanlder);
