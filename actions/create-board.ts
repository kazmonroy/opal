'use server';
import { z } from 'zod';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';

import { Board } from '@prisma/client';
import { redirect } from 'next/navigation';

const createBoardSchema = z.object({
  title: z.string({ required_error: 'Title is required' }).min(2, {
    message: 'Title must be at least 2 characters',
  }),
});

export interface FormState {
  errors: {
    title?: string[];
    _form?: string[];
  };
}
export async function createBoard(
  formSate: FormState,
  formData: FormData
): Promise<FormState> {
  const result = createBoardSchema.safeParse({
    title: formData.get('title') as string,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let board: Board;
  try {
    board = await db.board.create({
      data: {
        title: result.data?.title,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: { _form: [error.message] },
      };
    } else {
      return {
        errors: { _form: ['Something went wrong'] },
      };
    }
  }

  revalidatePath('/organization/org_2kqEZ54g9lVMBoeyeT7hDpyYjdB');
  redirect('/organization/org_2kqEZ54g9lVMBoeyeT7hDpyYjdB');
}
