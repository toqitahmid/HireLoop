import Link from "next/link";
import HeroBanner from "../../ui/Banner";
import { getAllJobs } from "@/app/lib/api/jobs";
import { getAllCompanies } from "@/app/lib/api/companies";
import JobCard from "../browseJobs/JobCard";

const HomePage = async () => {
  const [jobs, companies] = await Promise.all([
    getAllJobs(),
    getAllCompanies(),
  ]);
  const featuredJobs = Array.isArray(jobs) ? jobs.slice(0, 4) : [];
  const featuredCompanies = Array.isArray(companies)
    ? companies.slice(0, 4)
    : [];

  const planOptions = [
    {
      name: "Starter",
      price: "$0",
      description:
        "Browse jobs, save favorites, and get started with the basics.",
      highlight: "Best for new job seekers",
    },
    {
      name: "Growth",
      price: "$19/mo",
      description:
        "Unlimited applications, advanced tracking, and recruitment insights.",
      highlight: "Most popular",
    },
    {
      name: "Pro",
      price: "$39/mo",
      description:
        "Priority visibility, premium company matching, and premium support.",
      highlight: "Best for active job seekers",
    },
  ];

  return (
    <>
      <HeroBanner />

      <main className="mx-auto max-w-7xl space-y-20 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <section className="rounded-[32px] border border-zinc-800 bg-[#0e1115] p-8 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-400">
                Featured jobs
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Discover top opportunities right now
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-zinc-400">
                Hand-picked job openings across engineering, design, and product
                teams.
              </p>
            </div>
            <Link
              href="/browseJobs"
              className="inline-flex items-center justify-center rounded-full border border-sky-500/20 bg-sky-500/10 px-5 py-3 text-sm font-semibold text-sky-200 transition hover:bg-sky-500/20"
            >
              View all jobs
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredJobs.length > 0 ? (
              featuredJobs.map((job) => {
                const jobId = job._id?.$oid || job._id || job.id;
                return (
                  <div key={jobId} className="h-full">
                    <JobCard job={job} />
                  </div>
                );
              })
            ) : (
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8 text-center text-zinc-400">
                No featured jobs available right now.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[32px] border border-zinc-800 bg-[#0e1115] p-8 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
                Trusted companies
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                See who is hiring today
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-zinc-400">
                Explore hiring companies currently accepting applications on
                HireLoop.
              </p>
            </div>
            <Link
              href="/companies"
              className="inline-flex items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20"
            >
              Explore companies
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featuredCompanies.length > 0 ? (
              featuredCompanies.map((company) => {
                const companyId =
                  company._id?.$oid || company._id || company.id;
                return (
                  <div
                    key={companyId}
                    className="rounded-3xl border border-zinc-800 bg-[#111316] p-6 transition hover:border-emerald-500/40"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {company.name}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-500">
                          {company.industry || "Hiring now"}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-zinc-900 px-3 py-2 text-xs uppercase tracking-[0.2em] text-zinc-400">
                        {company.status || "Pending"}
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-zinc-400 line-clamp-3">
                      {company.description ||
                        "Company details are being updated."}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2 text-xs text-zinc-500">
                      {company.location && (
                        <span className="rounded-full border border-zinc-800 bg-zinc-950/80 px-3 py-1">
                          {company.location}
                        </span>
                      )}
                      {company.employees && (
                        <span className="rounded-full border border-zinc-800 bg-zinc-950/80 px-3 py-1">
                          {company.employees} employees
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8 text-center text-zinc-400">
                No companies to display right now.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[32px] border border-zinc-800 bg-[#0e1115] p-8 shadow-xl">
          <div className="md:flex md:items-center md:justify-between md:gap-8">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-violet-400">
                Plans
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Plans built for every journey
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                Start with a free plan or choose an advanced tier for more
                applications, insights, and priority support.
              </p>
            </div>
            <Link
              href="/plans"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-3 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/20 md:mt-0"
            >
              View pricing
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {planOptions.map((plan) => (
              <div
                key={plan.name}
                className="rounded-3xl border border-zinc-800 bg-[#111316] p-6 shadow-sm transition hover:border-violet-500/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
                      {plan.name}
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-white">
                      {plan.price}
                    </p>
                  </div>
                  <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs uppercase tracking-[0.18em] text-zinc-400">
                    {plan.highlight}
                  </span>
                </div>
                <p className="mt-5 text-sm leading-6 text-zinc-400">
                  {plan.description}
                </p>
                <Link
                  href="/plans"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-900"
                >
                  Choose plan
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
