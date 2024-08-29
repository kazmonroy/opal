"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { InputType, ReturnType } from "./types";
import { updateListOrderSchema } from "./schema";
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

  let lists;
  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      })
    );

    lists = await db.$transaction(transaction);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: "Failed to reoder list.",
      };
    }
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: lists,
  };
}

export const updateListOrder = createSafeAction(updateListOrderSchema, hanlder);
