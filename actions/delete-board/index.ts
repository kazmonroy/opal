'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Board } from '@prisma/client';
import { InputType, ReturnType } from './types';
import { deleteBoardSchema } from './schema';
import { createSafeAction } from '@/lib/create-safe-action';
import { ACTION, createAuditLog, ENTITY_TYPE } from '@/lib/create-audit-log';
import { db } from '@/db';
import {
  decrementAvailableCount,
  incrementAvailableCount,
} from '@/lib/org-limit';
import { checkSubscription } from '@/lib/subscription';

async function hanlder(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'Not Authorized',
    };
  }
  const isPro = await checkSubscription();

  const { id } = data;

  let board: Board;
  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

    if (!isPro) {
      await decrementAvailableCount();
    }

    await createAuditLog({
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      entityTitle: board.title,
      action: ACTION.DELETE,
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
