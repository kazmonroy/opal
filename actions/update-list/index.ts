"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { List } from "@prisma/client";
import { InputType, ReturnType } from "./types";
import { updateListSchema } from "./schema";
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

  const { title, id, boardId } = data;

  let list: List;
  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    });
    await createAuditLog({
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      entityTitle: list.title,
      action: ACTION.UPDATE,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: "Failed to update list",
      };
    }
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
}

export const updateList = createSafeAction(updateListSchema, hanlder);
