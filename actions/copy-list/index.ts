'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { List } from '@prisma/client';
import { InputType, ReturnType } from './types';
import { copyListSchema } from './schema';
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
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!listToCopy) {
      return {
        error: 'List not found',
      };
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: 'desc' },
      select: {
        order: true,
      },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;
    list = await db.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: 'Failed to copy list',
      };
    }
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
}

export const copyList = createSafeAction(copyListSchema, hanlder);
