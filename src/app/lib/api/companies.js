"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getRecruiterCompany = async (recruiterId) => {
  const url = `${baseUrl}/api/my/companies/${recruiterId}`;
//   console.log("Fetching:", url);
  const res = await fetch(url);
//   console.log("Status:", res.status);
  const text = await res.text();
//   console.log("Response body:", text);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  return text ? JSON.parse(text) : null;
};

export const getAllCompanies = async() => {
  const res = await fetch(`${baseUrl}/api/companies`);
  const data = await res.json();
  return data;
}