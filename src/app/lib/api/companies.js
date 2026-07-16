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

export const getCompany = async (recruiterId) => {
  const url = `${baseUrl}/api/my/companies/${recruiterId}`;
  console.log("fetching", url);

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch error cause:", err.cause); // <-- this reveals ECONNREFUSED, etc.
    throw err;
  }
};