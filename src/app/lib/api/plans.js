"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getUrl = (path) => {
  return baseUrl ? `${baseUrl}${path}` : path;
};

const parseJsonResponse = async (res) => {
  const text = await res.text();
  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    const errorMsg = text || `Request failed with status ${res.status}`;
    throw new Error(errorMsg);
  }

  if (!text) {
    return null;
  }

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text);
    } catch (error) {
      throw new Error(`Invalid JSON response from ${res.url}`);
    }
  }

  throw new Error(`Unexpected response type ${contentType} from ${res.url}`);
};

export const getPlanById = async (plan_id) => {
  const res = await fetch(getUrl(`/api/plans?plan_id=${plan_id}`));
  return parseJsonResponse(res);
};
