import { getApplicationsByApplicant } from '@/app/lib/api/applications';
import { getUserSession } from '@/app/lib/core/session';
import React from 'react'
import ApplicationTable from "./ApplicationTable";

const page = async() => {
    const user = await getUserSession();
    const jobs = await getApplicationsByApplicant(user?.id);
    return (
      <div>
        <div>
           <ApplicationTable jobs = {jobs}></ApplicationTable>
        </div>
      </div>
    );
};

export default page;