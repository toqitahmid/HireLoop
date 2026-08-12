"use server";

import { authHeader } from "../actions/token";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getCompanyJobs = async (companyId, status = "active") => {
  const res = await fetch(
    `${baseUrl}/api/jobs?companyId=${companyId}&${status}`,{
      headers:{... await authHeader()}
    }
  );
  const text = await res.text();
  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  if (!text) return null;
  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text);
    } catch (error) {
      throw new Error(`Invalid JSON response from ${res.url}`);
    }
  }
  throw new Error(`Unexpected response type ${contentType} from ${res.url}`);
};

export const getAllJobs = async () => {
  const res = await fetch(`${baseUrl}/api/jobs/all`,
  //  {
  //   // headers:{ ... await authHeader()}
  //  }
  );
  const text = await res.text();
  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  if (!text) return null;
  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text);
    } catch (error) {
      throw new Error(`Invalid JSON response from ${res.url}`);
    }
  }
  throw new Error(`Unexpected response type ${contentType} from ${res.url}`);
};

export const getJobById = async (id) => {
  const res = await fetch(`${baseUrl}/api/jobs/${id}`,{
    // headers: {... await authHeader()}
  });
  const text = await res.text();
  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  if (!text) return null;
  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text);
    } catch (error) {
      throw new Error(`Invalid JSON response from ${res.url}`);
    }
  }
  throw new Error(`Unexpected response type ${contentType} from ${res.url}`);
};
