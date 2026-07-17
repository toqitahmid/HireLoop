import React from "react";
// Import pure structural/style packages from Hero UI
import { Card, Avatar, Separator, Chip } from "@heroui/react";
// Semantic Lucide navigation and detail icons
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Building2,
  ArrowLeft,
  CheckCircle2,
  Gift,
  FileText,
  Send,
} from "lucide-react";
import Link from "next/link";
import { getJobById } from "@/app/lib/api/jobs";

const Page = async ({ params }) => {
  const { id } = await params;
  const jobData = await getJobById(id);

  console.log("Job details fetched in page.jsx:", jobData);

  // Graceful fallback to avoid runtime crashes on undefined data
  const {
    status = true,
    isRemote = false,
    currency = "USD",
    companyName = "Unknown Company",
    jobTitle = "Position Title",
    deadline = "N/A",
    location = "N/A",
    minSalary = "0",
    maxSalary = "0",
    responsibilities = "",
    requirements = "",
    benefits = "",
  } = jobData || {};

  // Workspace configuration checks
  const workMode = isRemote ? "Remote" : "On-site";

  // Clean financial currency parsing
  const salarySign = currency === "USD" ? "$" : currency;
  const salaryString = `${salarySign}${minSalary} – ${salarySign}${maxSalary} / hour`;

  // Safe split helper for formatting bullet list content
  const parseList = (text) => {
    if (!text) return [];
    return text
      .split(/[,\n]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const responsibilitiesList = parseList(responsibilities);
  const requirementsList = parseList(requirements);
  const benefitsList = parseList(benefits);

  return (
    <div className="min-h-screen bg-[#09090b] py-8 text-zinc-100">
      <div className="w-full max-w-5xl mx-auto px-4 space-y-6">
        {/* --- BACK NAVIGATION ACTION --- */}
        <div className="flex items-center justify-between">
          <Link
            href="/browseJobs"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Browse Jobs
          </Link>

          <Chip
            variant="flat"
            color={status ? "success" : "danger"}
            className="capitalize font-semibold text-xs px-3"
          >
            {status ? "Accepting Applications" : "Closed"}
          </Chip>
        </div>

        {/* --- MAIN PAGE CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* LEFT COLUMN: Main Job Specifications (Takes up 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-[#121213] border border-zinc-900 p-6 sm:p-8">
              <Card.Header className="p-0 flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <Building2 className="w-8 h-8 text-amber-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      {jobTitle}
                    </h1>
                    <p className="text-zinc-400 font-medium mt-0.5">
                      {companyName}
                    </p>
                  </div>
                </div>
              </Card.Header>

              <Separator className="my-6 bg-zinc-900" />

              <Card.Content className="p-0 space-y-8">
                {/* A. Role Description */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-500" />
                    Role Description
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                    We are looking for a dedicated and skilled {jobTitle} to
                    join our team at {companyName}. In this role, you will play
                    a critical part in helping us scale our core platforms,
                    design clean architecture, and contribute to an incredibly
                    collaborative development ecosystem.
                  </p>
                </div>

                {/* B. Responsibilities Checklist */}
                {responsibilitiesList.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white">
                      Core Responsibilities
                    </h3>
                    <ul className="space-y-2.5">
                      {responsibilitiesList.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-zinc-400"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* C. Requirements Checklist */}
                {requirementsList.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white">
                      Requirements & Credentials
                    </h3>
                    <ul className="space-y-2.5">
                      {requirementsList.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-zinc-400"
                        >
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* D. Perks and Benefits Checklist */}
                {benefitsList.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Gift className="w-5 h-5 text-pink-400" />
                      Perks & Benefits
                    </h3>
                    <ul className="space-y-2.5">
                      {benefitsList.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-zinc-400"
                        >
                          <span className="text-pink-400">✦</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card.Content>
            </Card>
          </div>

          {/* RIGHT COLUMN: Sidebar Metadata Panel (Takes up 1 col) */}
          <div className="space-y-6">
            <Card className="bg-[#121213] border border-zinc-900 p-6">
              <Card.Header className="p-0 pb-4 border-b border-zinc-900">
                <h3 className="text-base font-bold text-white">Job Overview</h3>
              </Card.Header>

              <Card.Content className="p-0 py-4 space-y-4">
                {/* Location Metric */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                      Location
                    </span>
                    <span className="text-sm font-medium text-zinc-200">
                      {location}
                    </span>
                  </div>
                </div>

                {/* Work mode Metric */}
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                      Job Type
                    </span>
                    <span className="text-sm font-medium text-zinc-200">
                      {workMode}
                    </span>
                  </div>
                </div>

                {/* Salary Range Metric */}
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                      Salary Range
                    </span>
                    <span className="text-sm font-medium text-zinc-200">
                      {salaryString}
                    </span>
                  </div>
                </div>

                {/* Deadline Metric */}
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                      Deadline
                    </span>
                    <span className="text-sm font-medium text-zinc-200">
                      {deadline}
                    </span>
                  </div>
                </div>
              </Card.Content>

              <Card.Footer className="p-0 pt-4 border-t border-zinc-900">
                {status ? (
                  /* 
                    Using a clean native link styled beautifully with Tailwind. 
                    This eliminates any component-passing errors in Server Components.
                  */
                  <Link
                    href={`/browseJobs/${id}/apply`}
                    className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold text-sm transition-all duration-200 py-3 rounded-xl select-none"
                  >
                    <span>Apply For This Job</span>
                    <Send size={16} />
                  </Link>
                ) : (
                  <div className="w-full text-center bg-zinc-800 text-zinc-500 font-semibold text-sm py-3 rounded-xl select-none">
                    Applications Closed
                  </div>
                )}
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
