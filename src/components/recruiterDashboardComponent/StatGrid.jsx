import React from "react";
// Correct Gravity UI Icon imports
import {
  FileText,
  Persons,
  Thunderbolt,
  CircleCheck,
  Globe,
  MapPin,
  Briefcase,
} from "@gravity-ui/icons";
import StatCard from "./StatCard";
import { getUserSession } from "@/app/lib/core/session";
import { getRecruiterCompany } from "@/app/lib/api/companies";
import { Avatar } from "@heroui/react";

export const StatGrid = async () => {
  const recruiter = await getUserSession();
  console.log(recruiter);
  const recruiterCompany = await getRecruiterCompany(recruiter?.id);

  const statsData = [
    {
      id: 1,
      title: "Total Job Posts",
      value: "48",
      icon: FileText,
    },
    {
      id: 2,
      title: "Total Applicants",
      value: "1,284",
      icon: Persons,
    },
    {
      id: 3,
      title: "Active Jobs",
      value: "18",
      icon: Thunderbolt,
    },
    {
      id: 4,
      title: "Jobs Closed",
      value: "32",
      icon: CircleCheck,
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col-reverse flex-row-reverse items-center justify-center">
        {/* Outer Layout Container: Grid side-by-side on lg, stacked below */}
        <div className="lg:min-w-[78vw] md:min-w-[68vw] min-w-[85vw] grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 bg-[#121213] p-4 rounded-2xl gap-4 items-start border border-zinc-800/40">
          {/* Left Panel: Statistics Cards Grid */}
          <div className="w-full grid grid-cols-2 gap-2">
            {statsData.map((stat) => (
              <StatCard
                key={stat?.id}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
              />
            ))}
          </div>

          {/* Right Panel: Short Recruiter Company Info */}
          {recruiterCompany && (
            <div className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl p-4 flex flex-col justify-between h-full space-y-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <Avatar.Image
                    alt={recruiterCompany.name}
                    src={recruiterCompany.logoUrl}
                  />
                  <Avatar.Fallback>JD</Avatar.Fallback>
                </Avatar>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">
                    {recruiterCompany.name}
                  </h3>
                  <p className="text-zinc-500 text-xs truncate flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-emerald-400" />{" "}
                    {recruiterCompany.industry}
                  </p>
                </div>
              </div>

              <p className="text-zinc-400 text-xs leading-relaxed bg-[#121213] p-2.5 rounded-lg border border-zinc-800/60 line-clamp-2">
                {recruiterCompany.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400 pt-1 border-t border-zinc-800/60">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                  <span className="truncate">{recruiterCompany.location}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate justify-end">
                  <Globe className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                  <a
                    href={recruiterCompany.website}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-500 transition-colors truncate"
                  >
                    Website
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatGrid;
