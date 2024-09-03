import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
const DAY_IN_MS = 84_400_000;

export async function checkSubscription() {
  const { orgId } = auth();
  if (!orgId) {
    return false;
  }

  const orgSubscription = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  // DAY_IN_MS is 24 hours in milliseconds and adds a buffer to the subscription end date
  const isValidSubcription =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValidSubcription;
}
