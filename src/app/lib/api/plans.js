'use server';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPlanById = async(plan_id) => {
    const res = await fetch(`${baseUrl}/api/plans?plan_id=${plan_id}`);
    const data = await res.json();
    return data;
}