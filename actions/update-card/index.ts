"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Card } from "@prisma/client";
import { InputType, ReturnType } from "./types";
import { updateCardSchema } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/db";

async function hanlder(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Not Authorized",
    };
  }

  const { id, boardId, ...values } = data;

  let card: Card;
  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: "Failed to update card",
      };
    }
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: card,
  };
}

export const updateCard = createSafeAction(updateCardSchema, hanlder);
