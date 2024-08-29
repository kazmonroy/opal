"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { InputType, ReturnType } from "./types";
import { updateCardOrderSchema } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/db";

async function hanlder(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Not Authorized",
    };
  }

  const { items, boardId } = data;

  let updatedCards;
  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );

    updatedCards = await db.$transaction(transaction);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: "Failed to reoder cards.",
      };
    }
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: updatedCards,
  };
}

export const updateCardOrder = createSafeAction(updateCardOrderSchema, hanlder);
