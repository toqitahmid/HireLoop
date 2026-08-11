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
    return [];
  }

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text);
    } catch (error) {
      console.error(
        "Failed to parse JSON from getApplicationsByApplicant:",
        error,
        text,
      );
      return [];
    }
  }

  console.error(
    "Unexpected content type from getApplicationsByApplicant:",
    contentType,
    text,
  );
  return [];
};

export const getApplicationsByApplicant = async (applicantId) => {
  try {
    if (!applicantId) {
      return [];
    }

    const res = await fetch(
      getUrl(
        `/api/applications?applicantId=${encodeURIComponent(applicantId)}`,
      ),
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const errorText = await res.text();

      console.error(
        "getApplicationsByApplicant API error:",
        res.status,
        errorText,
      );

      return [];
    }

    return parseJsonResponse(res);
  } catch (error) {
    console.error("getApplicationsByApplicant error:", error);
    return [];
  }
};
