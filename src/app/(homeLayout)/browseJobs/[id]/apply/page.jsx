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
    return (
        <div>
            Apply Now
        </div>
    );
};

export default page;