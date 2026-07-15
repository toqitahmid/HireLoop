import React from "react";
import { getCompanyJobs } from "@/app/lib/api/jobs";
import JobDashboardTable from "./JobDashboardTable";


const Jobs = async () => {
  const companyId = "islami_123";
  const jobs = await getCompanyJobs(companyId);

  return (
    <div className="container mx-auto py-8 px-4">

      <JobDashboardTable jobs={jobs} />
    </div>
  );
};

export default Jobs;
