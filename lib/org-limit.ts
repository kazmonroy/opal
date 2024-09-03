import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { MAX_FREE_BOARDS } from "@/constants/boards";

export async function incrementAvailableCount() {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Not Authorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count + 1,
      },
    });
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
}

export async function decrementAvailableCount() {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Not Authorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (orgLimit) {
    await db.orgLimit.update({
      where: {
        orgId,
      },
      data: {
        count: orgLimit.count > 0 ? orgLimit.count - 1 : 0,
      },
    });
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    });
  }
}

export async function hasAvailableCount() {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Not Authorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  } else {
    return false;
  }
}

export async function getAvailableCount() {
  const { orgId } = auth();

  if (!orgId) {
    return 0;
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  if (!orgLimit) {
    return 0;
  }

  return orgLimit.count;
}
