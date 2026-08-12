import { getJobById } from "@/app/lib/api/jobs";
import { getUserSession } from "@/app/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import ApplyPage from "./ApplyPage";
import Link from "next/link";
import { getApplicationsByApplicant } from "@/app/lib/api/applications";
import { getPlanById } from "@/app/lib/api/plans";

const page = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/login?redirect=/browseJobs/${id}/apply`);
  }

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

  let noOfApplication = [];
  let job;
  let plan;

  try {
    noOfApplication = await getApplicationsByApplicant(user?.id);
    plan = await getPlanById(user?.plan)
    job = await getJobById(id);
  } catch (error) {
    console.error("Apply page data fetch error:", error);

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">
          Unable to load job application page
        </h1>
        <p className="text-zinc-400">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full sm:w-10/12 md:w-8/12 lg:w-5/12 xl:w-3/12 mx-auto text-center sm:text-left">
        <h2 className="text-sm sm:text-base font-medium">
          You can apply for {noOfApplication?.length} jobs of{" "}
          {plan?.maxApplication}
        </h2>
        <Link
          href="/plans"
          className="text-sm sm:text-base text-blue-500 hover:underline whitespace-nowrap"
        >
          View Pricing
        </Link>
      </div>

      {noOfApplication?.length < plan?.maxApplication ? (
        <ApplyPage job={job} user={user} />
      ) : (
        <div className="min-h-[50vh] flex justify-center items-center px-4 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-red-400">
            You hit the limit
          </h1>
        </div>
      )}
    </div>
  );
};

export default page;
