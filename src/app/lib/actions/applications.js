'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createApplication = async (applicationData) => {
  const res = await fetch(`${baseUrl}/api/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicationData),
  });

  return res.json();
};