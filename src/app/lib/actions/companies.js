"use server";

import { authHeader } from "./token";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createCompany = async (newCompanyData) => {
  const res = await fetch(`${baseUrl}/api/companies`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ... await authHeader()
    },
    body: JSON.stringify(newCompanyData),
  });
  return res.json();
};


export const updateCompanyStatus = async(id, status) => {
  const res = await fetch(`${baseUrl}/api/companies/${id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ... await authHeader()
    },
    body: JSON.stringify({status}),
  });
  return res.json();
}