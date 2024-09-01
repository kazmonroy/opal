"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Card } from "@prisma/client";
import { InputType, ReturnType } from "./types";
import { createCardSchema } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/db";

async function hanlder(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Not Authorized",
    };
  }

  const { title, boardId, listId } = data;

  let card: Card;
  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        boardId,
        board: {
          orgId,
        },
      },
    });

    if (!list) {
      return {
        error: "List not found.",
      };
    }

    const lastCard = await db.card.findFirst({
      where: {
        listId,
      },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({ data: { title, listId, order: newOrder } });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: "Failed to create card",
      };
    }
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: card,
  };
}

export const createCard = createSafeAction(createCardSchema, hanlder);
