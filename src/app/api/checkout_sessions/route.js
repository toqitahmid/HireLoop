import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../lib/stripe";
import { PLAN_PRICE_MAP } from "@/app/lib/plans";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const planId = formData.get("plan_id");
    const priceId = PLAN_PRICE_MAP[planId];

    if (!priceId) {
      return NextResponse.json({ error: "Missing plan_id" }, { status: 400 });
    }

    const headersList = await headers();
    const origin = headersList.get("origin");

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/plans`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
