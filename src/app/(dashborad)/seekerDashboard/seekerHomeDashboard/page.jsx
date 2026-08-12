import { requiredRole, getUserSession } from "@/app/lib/core/session";
import React from "react";
import { getApplicationsByApplicant } from "@/app/lib/api/applications";
import SeekerStatGrid from "@/components/seekerDashboardComponent/SeekerStatGrid";
import ApplicationTable from "../seekerJobs/ApplicationTable";

const page = async () => {
  await requiredRole("seeker");

  const user = await getUserSession();
  const applications = await getApplicationsByApplicant(user?.id);

  const total = applications?.length || 0;
  const active =
    applications?.filter((a) => (a.status || "").toLowerCase() !== "closed")
      .length || 0;
  const interviews =
    applications?.filter((a) =>
      (a.status || "").toLowerCase().includes("interview"),
    ).length || 0;

  const recent = applications?.slice(0, 6) || [];

  return (
    <div className="space-y-6">
      <SeekerStatGrid stats={{ total, active, interviews }} />

      <div className="bg-[#0b0b0b] p-4 rounded-2xl border border-zinc-800/40">
        <h3 className="text-lg font-semibold mb-3 text-white">
          Recent Applications
        </h3>
        <ApplicationTable jobs={recent} />
      </div>
    </div>
  );
};

export default page;
