'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getApplicationsByApplicant = async(applicantId) => {
    const res = await fetch(`${baseUrl}/api/applications?applicantId=${applicantId}`);
    return res.json();
}