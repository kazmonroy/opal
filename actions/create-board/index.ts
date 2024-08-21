'use server';

import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { db } from '@/db';
import { Board } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { createBoardSchema } from './schema';

async function handler(data: InputType): Promise<ReturnType> {
  const { userId } = auth();

  if (!userId) {
    return {
      error: 'Not Authorized',
    };
  }
  const { title } = data;

  let board: Board;
  try {
    board = await db.board.create({
      data: {
        title,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: 'Something went wrong',
      };
    }
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
}

export const createBoard = createSafeAction(createBoardSchema, handler);
