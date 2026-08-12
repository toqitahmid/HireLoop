import { redirect } from "next/navigation";

import { stripe } from "../../../lib/stripe";
import { createSubscription } from "@/app/lib/actions/subscriptions";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
    metadata,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/plans");
  }

  if (status === "complete") {
    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId
    }
    const res = await createSubscription(subsInfo);
    console.log(res);
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
}
