import React from "react";
import { requiredRole } from "@/app/lib/core/session";
import { getAllCompanies } from "@/app/lib/api/companies";
import { getAllJobs } from "@/app/lib/api/jobs";
import AdminStatGrid from "@/components/adminDashboardComponent/AdminStatGrid";

const page = async () => {
  await requiredRole("admin");

  const [companies, jobs] = await Promise.all([
    getAllCompanies(),
    getAllJobs(),
  ]);
  const companiesArray = Array.isArray(companies) ? companies : [];
  const jobsArray = Array.isArray(jobs) ? jobs : [];

  const stats = {
    totalJobs: jobsArray.length,
    activeJobs: jobsArray.filter(
      (job) => job?.status === true || job?.status === "active",
    ).length,
    totalCompanies: companiesArray.length,
    pendingCompanies: companiesArray.filter(
      (company) =>
        company?.status === "Pending" ||
        company?.status === "pending" ||
        !company?.status,
    ).length,
  };

  const latestJobs = jobsArray.slice(0, 5);
  const latestCompanies = companiesArray.slice(0, 5);

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-zinc-800 bg-[#0b0b0d] p-6 shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-400">
              Admin dashboard
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
              Welcome back, administrator.
            </h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Monitor all jobs, company submissions, and approval workflows from
              one place.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-2">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Total Jobs
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {stats.totalJobs}
              </p>
            </div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Pending Companies
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {stats.pendingCompanies}
              </p>
            </div>
          </div>
        </div>
      </section>

      <AdminStatGrid stats={stats} />

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="rounded-[32px] border border-zinc-800 bg-[#0b0b0d] p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Recent Jobs</h2>
              <p className="text-sm text-zinc-500">
                Newest listings across the platform.
              </p>
            </div>
            <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
              {jobsArray.length} total
            </span>
          </div>

          <div className="space-y-3">
            {latestJobs.length > 0 ? (
              latestJobs.map((job) => {
                const id = job._id?.$oid || job._id || job.id;
                return (
                  <div
                    key={id}
                    className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-4 hover:border-sky-500/30 transition-colors"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {job.jobTitle || job.title || "Untitled role"}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {job.companyName || job.company || "Unknown company"}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-semibold ${job?.status === true || job?.status === "active" ? "text-emerald-300" : "text-rose-300"}`}
                      >
                        {job?.status === true || job?.status === "active"
                          ? "Active"
                          : "Closed"}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-400">
                      {job.location && (
                        <span className="rounded-full bg-zinc-900/70 px-3 py-1">
                          {job.location}
                        </span>
                      )}
                      {typeof job.isRemote === "boolean" && (
                        <span className="rounded-full bg-zinc-900/70 px-3 py-1">
                          {job.isRemote ? "Remote" : "On-site"}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-zinc-500">
                No jobs available right now.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-[32px] border border-zinc-800 bg-[#0b0b0d] p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white">
              Recent Company Submissions
            </h2>
            <p className="text-sm text-zinc-500">
              Companies awaiting review and approval.
            </p>
          </div>

          <div className="space-y-3">
            {latestCompanies.length > 0 ? (
              latestCompanies.map((company) => {
                const id = company._id?.$oid || company._id || company.id;
                return (
                  <div
                    key={id}
                    className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {company.name || "Untitled company"}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {company.industry || "Industry not set"}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${company.status === "Approved" ? "bg-emerald-500/10 text-emerald-300" : company.status === "Rejected" ? "bg-rose-500/10 text-rose-300" : "bg-amber-500/10 text-amber-300"}`}
                      >
                        {company.status || "Pending"}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-zinc-500">
                No company submissions yet.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;
