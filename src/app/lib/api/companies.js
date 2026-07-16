"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createCompany = async (newCompanyData) => {
  const res = await fetch(`${baseUrl}/api/companies`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newCompanyData),
  });
  return res.json();
};

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