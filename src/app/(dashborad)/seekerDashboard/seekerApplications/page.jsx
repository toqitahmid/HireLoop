import React from "react";
import { requiredRole, getUserSession } from "@/app/lib/core/session";
import { getApplicationsByApplicant } from "@/app/lib/api/applications";
import SeekerApplicationsList from "@/components/seekerDashboardComponent/SeekerApplicationsList";

const page = async () => {
  await requiredRole("seeker");

  const user = await getUserSession();
  let applications = [];
  try {
    applications = (await getApplicationsByApplicant(user?.id)) || [];
  } catch (err) {
    console.error("Failed to load seeker applications:", err);
    applications = [];
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Your Applications</h2>
      <div className="bg-[#0b0b0b] p-4 rounded-2xl border border-zinc-900">
        <SeekerApplicationsList applications={applications} />
      </div>
    </div>
  );
};

export default page;
