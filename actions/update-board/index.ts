"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Board } from "@prisma/client";
import { InputType, ReturnType } from "./types";
import { updateBoardSchema } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { ACTION, createAuditLog, ENTITY_TYPE } from "@/lib/create-audit-log";
import { db } from "@/db";

async function hanlder(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Not Authorized",
    };
  }

  const { title, id } = data;

  let board: Board;
  try {
    board = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });

    await createAuditLog({
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      entityTitle: board.title,
      action: ACTION.UPDATE,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: "Failed to update board",
      };
    }
  }

  revalidatePath(`/board/${id}`);
  return {
    data: board,
  };
}

export const updateBoard = createSafeAction(updateBoardSchema, hanlder);
