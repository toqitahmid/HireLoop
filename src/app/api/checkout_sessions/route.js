import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { PLAN_PRICE_ID, stripe } from "../../lib/stripe";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const { planId } = await req.json();
    const priceId = PLAN_PRICE_ID[planId];

    if (!priceId) {
      return NextResponse.json(
        { error: `No price configured for plan "${planId}"` },
        { status: 400 },
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      metadata: {planId},
      success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/plans`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
