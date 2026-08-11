"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createApplication = async (applicationData) => {
  const url = baseUrl ? `${baseUrl}/api/applications` : "/api/applications";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicationData),
  });

  const text = await res.text();
  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    const errorDetail = text || `Request failed with status ${res.status}`;
    throw new Error(errorDetail);
  }

  if (!text) {
    return {};
  }

  if (contentType.includes("application/json")) {
    return JSON.parse(text);
  }

  return { message: text };
};
