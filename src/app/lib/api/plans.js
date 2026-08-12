"use server";

import { authHeader } from "../actions/token";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPlanById = async (planId) => {
  try {
    const res = await fetch(`${baseUrl}/api/plans?plan_id=${planId}`, {
      cache: "no-store",
      headers: {... await authHeader()}
    });

    const text = await res.text();

    if (!res.ok) {
      console.error("getPlanById failed:", res.status, text);
      return null;
    }

    if (!text) {
      console.error("getPlanById: empty response body");
      return null;
    }

    return JSON.parse(text);
  } catch (error) {
    console.log("getPlanById error:", error);
    return null;
  }
};
