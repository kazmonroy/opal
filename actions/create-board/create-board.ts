'use server';
import { db } from '@/db';
import { Board } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createBoardSchema = z.object({
  title: z.string().min(3, {
    message: 'Title must be at least 3 characters',
  }),
});

interface CreateBoardFormState {
  errors: {
    title?: string[];
    _form?: string[];
  };
}

export async function createBoard(
  formState: CreateBoardFormState,
  formData: FormData
): Promise<CreateBoardFormState> {
  const result = createBoardSchema.safeParse({
    title: formData.get('title'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let board: Board;
  try {
    board = await db.board.create({
      data: { title: result.data.title },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      };
    }
  }

  revalidatePath('/organization/org_2kqEZ54g9lVMBoeyeT7hDpyYjdB');
  redirect('/organization/org_2kqEZ54g9lVMBoeyeT7hDpyYjdB');
}
