import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  //   Event after the ckeckout session is completed
  const session = event.data.object as Stripe.Checkout.Session;
  if (event.type === "checkout.session.completed") {
    const orgSubscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.orgId) {
      return new NextResponse("OrgId not found", { status: 400 });
    }

    await db.orgSubscription.create({
      data: {
        orgId: session?.metadata?.orgId,
        stripeSubscriptionId: orgSubscription.id,
        stripeCustomerId: orgSubscription.customer as string,
        stripePriceId: orgSubscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          orgSubscription.current_period_end * 1000
        ),
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const orgSubscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await db.orgSubscription.update({
      where: {
        stripeSubscriptionId: orgSubscription.id,
      },
      data: {
        stripePriceId: orgSubscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          orgSubscription.current_period_end * 1000
        ),
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
