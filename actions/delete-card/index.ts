"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Card } from "@prisma/client";
import { InputType, ReturnType } from "./types";
import { deleteCardSchema } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/db";

async function hanlder(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Not Authorized",
    };
  }

  const { id, boardId } = data;

  let card: Card;
  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
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
        error: "Failed to delete card",
      };
    }
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: card,
  };
}

export const deleteCard = createSafeAction(deleteCardSchema, hanlder);
