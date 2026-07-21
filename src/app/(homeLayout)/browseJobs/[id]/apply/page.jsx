import { getJobById } from "@/app/lib/api/jobs";
import { getUserSession } from "@/app/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import ApplyPage from "./ApplyPage";
import { getApplicationsByApplicant } from "@/app/lib/api/applications";
import { Card } from "@heroui/react";
import Link from "next/link";
import { getPlanById } from "@/app/lib/api/plans";

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
  const plan = await getPlanById(user?.plan); //

  return (
    <div>
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <Card className="w-full bg-background border border-default-200/60 shadow-md hover:shadow-lg transition-shadow duration-300">
          <Card.Header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-6 md:p-8 border-b border-default-100">
            <div>
              <Card.Title className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                Job Application Status
              </Card.Title>
              <Card.Description className="text-sm md:text-base text-default-500 mt-1">
                Track your monthly quota and remaining job applications
              </Card.Description>
            </div>

            {/* Desktop Status Badge */}
            <div className="self-start sm:self-auto">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium border ${
                  plan.applicationsPerMonth - application.length <= 0
                    ? "bg-danger-50 text-danger border-danger-200 dark:bg-danger-950/30 dark:border-danger-800"
                    : "bg-primary-50 text-primary border-primary-200 dark:bg-primary-950/30 dark:border-primary-800"
                }`}
              >
                {plan.applicationsPerMonth - application.length <= 0
                  ? "Limit Reached"
                  : "Active Plan"}
              </span>
            </div>
          </Card.Header>

          <Card.Content className="p-6 md:p-10 flex flex-col items-center justify-center min-h-[160px] md:min-h-[200px] bg-default-50/40">
            <p className="text-center text-lg md:text-2xl font-normal text-default-700 leading-relaxed max-w-2xl">
              You have applied to{" "}
              <span className="font-bold text-primary text-xl md:text-3xl decoration-primary/30">
                {application.length}
              </span>{" "}
              jobs out of{" "}
              <span className="font-bold text-foreground text-xl md:text-3xl">
                {plan.applicationsPerMonth}
              </span>{" "}
              allowed.
            </p>
          </Card.Content>

          <Card.Footer className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 md:px-8 bg-background text-xs md:text-sm text-default-400 border-t border-default-100">
            <span>Resets at the start of your next billing cycle</span>
            <span className="font-medium text-default-500">
              <Link href="/pricing">View Pricing</Link>
            </span>
          </Card.Footer>
        </Card>
      </div>
      {plan.applicationsPerMonth > application.length && <ApplyPage job={job} user={user} />}
    </div>
  );
};

export default page;
