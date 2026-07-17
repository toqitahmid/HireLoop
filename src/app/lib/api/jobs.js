'use server';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getCompanyJobs = async(companyId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&${status}`);
    
    return res.json(); 
}

export const getAllJobs = async() => {
    const res = await fetch(`${baseUrl}/api/jobs/all`);
    const data = await res.json();
    return data;
}