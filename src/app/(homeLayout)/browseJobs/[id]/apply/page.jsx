import { getJobById } from "@/app/lib/api/jobs";
import { getUserSession } from "@/app/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import ApplyPage from "./ApplyPage";
import { getApplicationsByApplicant } from "@/app/lib/api/applications";

const page = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();
  const application = await getApplicationsByApplicant(user?.id); // Fetch applications for the logged-in user

  // 1. Defensively protect the route immediately if the session doesn't exist
  if (!user) {
    redirect(`/login?redirect=/browseJobs/${id}/apply`);
  }

  // 2. Safely authorize the user role now that user is guaranteed to exist
  if (user.role !== "seeker") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-zinc-400">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }

  const job = await getJobById(id);
  const plan = 3;
  if(application.length === plan) {
    redirect(`/pricing`);
  }

  return (
    <div>
      {/* Handed the user object down so ApplyPage can read applicant details */}
      <p className="text-center">You have applied to {application.length} jobs out of {plan} allowed.</p>
      {
        application.length < plan && (

            <ApplyPage job={job} user={user} />
        )
      }
    </div>
  );
};

export default page;
