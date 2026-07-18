import { getUserSession } from '@/app/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async({params}) => {
    const { id } = await params;
    const user = await getUserSession();
    console.log(user);
    if(!user){
        redirect(`/login?redirect=/browseJobs/${id}/apply`);
    }
    if(user.role !== 'seeker'){
        return(
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-2xl font-bold mb-4'>Access Denied</h1>
                <p className='text-gray-600'>You do not have permission to access this page.</p>

            </div>
        )
    }
    return (
        <div>
            Apply Now
        </div>
    );
};

export default page;