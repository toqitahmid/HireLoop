import React from "react";
import { getCompanyJobs } from "@/app/lib/api/jobs";
import JobDashboardTable from "./JobDashboardTable";
import { getUserSession } from "@/app/lib/core/session";
import { getRecruiterCompany } from "@/app/lib/api/companies";


const Jobs = async () => {
  const recruiter = await getUserSession();
  const recruiterCompany = await getRecruiterCompany(recruiter?.id);
  const jobs = await getCompanyJobs(recruiterCompany?._id);

  return (
    <div className="container mx-auto py-8 px-4">

      <JobDashboardTable jobs={jobs} />
    </div>
  );
};

export default Jobs;
