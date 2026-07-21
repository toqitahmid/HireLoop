'use server';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createSubscription = async (subInfo) => {
  const res = await fetch(`${baseUrl}/api/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subInfo),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Subscription request failed (${res.status}): ${text.slice(0, 200)}`,
    );
  }
  return res.json();
};