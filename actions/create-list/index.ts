"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { List } from "@prisma/client";
import { InputType, ReturnType } from "./types";
import { createListSchema } from "./schema";
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

  const { title, boardId } = data;

  let list: List;
  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });
    if (!board) {
      return {
        error: "Board not found",
      };
    }

    const lastList = await db.list.findFirst({
      where: {
        board,
      },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    });

    // await createAuditLog({
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   entityTitle: list.title,
    //   action: ACTION.CREATE,
    // });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: "Failed to create list",
      };
    }
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
}

export const createList = createSafeAction(createListSchema, hanlder);
