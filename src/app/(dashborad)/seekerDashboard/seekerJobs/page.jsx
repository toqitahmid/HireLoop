import React from "react";
import { requiredRole } from "@/app/lib/core/session";
import { getAllJobs } from "@/app/lib/api/jobs";
import FilterdJobs from "@/app/(homeLayout)/browseJobs/FilterJobs";

const page = async () => {
  await requiredRole("seeker");

  let jobs = [];
  try {
    jobs = (await getAllJobs()) || [];
  } catch (err) {
    console.error("Failed to load jobs for seeker dashboard:", err);
    jobs = [];
  }

  return (
    <div className="p-4">
      <FilterdJobs initialJobs={jobs} />
    </div>
  );
};

export default page;
