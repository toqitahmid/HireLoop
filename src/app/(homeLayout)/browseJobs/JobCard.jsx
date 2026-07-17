import React from "react";
// Lucide icons for semantic pill badges matching the image design style
import {
  MapPin,
  Briefcase,
  DollarSign,
  ArrowRight,
  Calendar,
} from "lucide-react";
// Strict Hero UI v3 Imports: Card, Avatar, and Link component systems
import { Card, Avatar, Link } from "@heroui/react";
import NextLink from "next/link"; // Alias NextLink to prevent namespace collisions

export default function JobCard({ job }) {
  // Destructure exact properties directly from your real database payload schema
  const {
    jobTitle,
    companyName,
    logoUrl,
    location,
    isRemote,
    minSalary,
    maxSalary,
    currency,
    responsibilities,
    deadline,
    status,
    _id,
  } = job || {};

  // Workspace configuration checks
  const workMode = isRemote ? "Remote" : "On-site";

  // Clean financial currency string formatting
  const salarySign = currency === "USD" ? "$" : currency;
  const salaryString = `${salarySign}${minSalary}–${salarySign}${maxSalary}/hour`;

  return (
    <Card className="w-full max-w-sm bg-[#121213] text-white border border-zinc-900/80 p-6 flex flex-col justify-between group transition-all duration-300 hover:border-zinc-800">
      <div>
        {/* V3 Component Compound Structure: Header mapping Company Logo, Title & Description */}
        <Card.Header className="p-0 flex flex-col items-start gap-3">
          {logoUrl && (
            <Avatar
              src={logoUrl}
              alt={`${companyName} Logo`}
              className="w-10 h-10 bg-zinc-900 border border-zinc-800/80 p-0.5"
              radius="md"
            />
          )}
          <div className="flex flex-col items-start gap-0.5">
            <Card.Title className="text-2xl font-bold tracking-tight text-zinc-100 group-hover:text-amber-500 transition-colors duration-200">
              {jobTitle}
            </Card.Title>
            <Card.Description className="text-xs font-semibold text-zinc-500 tracking-wide uppercase">
              {companyName}
            </Card.Description>
          </div>
        </Card.Header>

        {/* V3 Component Compound Structure: Content area rendering the main body text & pill row badges */}
        <Card.Content className="p-0 mt-3">
          {/* Main textual content layout block */}
          <p className="text-zinc-400 text-sm font-normal leading-relaxed line-clamp-2">
            {responsibilities}
          </p>

          {/* Custom Styled Pill Badges mapped to match your exact image design structure */}
          <div className="flex flex-wrap gap-2 mt-5">
            {/* Location Pill */}
            <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 px-3 py-1.5 rounded-full text-xs font-medium">
              <MapPin size={13} className="text-pink-400 flex-shrink-0" />
              <span>{location}</span>
            </div>

            {/* Workplace Environment Mode Pill */}
            <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 px-3 py-1.5 rounded-full text-xs font-medium">
              <Briefcase size={13} className="text-pink-400 flex-shrink-0" />
              <span>{workMode}</span>
            </div>

            {/* Compensation/Salary Range Pill */}
            <div className="flex items-center gap-1.5 bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 px-3 py-1.5 rounded-full text-xs font-medium">
              <DollarSign size={13} className="text-pink-400 flex-shrink-0" />
              <span>{salaryString}</span>
            </div>
          </div>
        </Card.Content>
      </div>

      {/* V3 Component Compound Structure: Footer containing deadline trackers and interaction triggers */}
      <Card.Footer className="p-0 mt-8 pt-4 border-t border-zinc-900 flex items-center justify-between gap-2">
        {/* Expiration date metadata tracker */}
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium">
          <Calendar size={12} />
          <span>Ends: {deadline}</span>
        </div>

        {/* 
          Using Hero UI's own Link component with NextLink mapped to the "as" parameter 
          allows us to safely use properties like isDisabled and custom styles without console warnings.
        */}
        <Link
          as={NextLink}
          href={`/browseJobs/${_id}`}
          className="bg-transparent hover:bg-zinc-900/50 text-zinc-200 font-semibold text-sm transition-all duration-200 group-hover:text-white px-3 min-w-0"
          isDisabled={!status}
        >
          <span className="flex items-center gap-1">
            See Details
            <ArrowRight
              size={16}
              className="text-zinc-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
            />
          </span>
        </Link>
      </Card.Footer>
    </Card>
  );
}
