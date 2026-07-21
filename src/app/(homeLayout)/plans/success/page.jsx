import { redirect } from "next/navigation";

import { stripe } from "../../../lib/stripe";
import { Button, Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import { getUserSession } from "@/app/lib/core/session";
import { createSubscription } from "@/app/lib/actions/subscriptions";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;
  const user = await getUserSession();

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: stripeEmail },metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }
  const customerEmail = stripeEmail?? user?.email;

  if (status === "complete") {
    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId,
    }
    const result = await createSubscription(subsInfo);
    console.log("Subscription created:", result);
    return (
      <section id="success">
        <div className="flex items-center justify-center p-4 min-h-[300px]">
          <Card className="max-w-md w-full border border-default-200 shadow-sm">
            <Card.Header className="flex flex-col items-center text-center pt-6 pb-2">
              {/* Success Icon */}
              <div className="w-12 h-12 rounded-full bg-success-100 text-success flex items-center justify-center mb-3">
                <Icon icon="lucide:check-circle-2" className="w-6 h-6" />
              </div>

              <Card.Title className="text-xl font-bold text-default-900">
                Payment Successful!
              </Card.Title>

              <Card.Description className="text-sm text-default-500 mt-1">
                Your transaction has been processed. We have sent a confirmation
                email with details.
              </Card.Description>
            </Card.Header>

            <Card.Content className="text-center py-2">
              <div className="bg-default-50 p-3 rounded-lg border border-default-100 text-xs text-default-600">
                Order Reference:{" "}
                <span className="font-mono font-bold text-default-800">
                  #ORD-98421
                </span>
              </div>
            </Card.Content>

            <Card.Footer className="flex flex-col sm:flex-row gap-2 pt-2 pb-6">
              <Button color="accent" className="w-full font-medium">
                View Receipt
              </Button>
              <Button variant="outline" className="w-full font-medium">
                Continue
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </section>
    );
  }
}
