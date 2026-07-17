import { getUserSession } from "@/app/lib/core/session";
import CompanyRegistration from "./CompanyRegistration";
import { getRecruiterCompany } from "@/app/lib/api/companies";
import { Building2, ExternalLink, Info, MapPin, Users } from "lucide-react";
import { Avatar, Button, Card, } from "@heroui/react";

const page = async () => {
  const recruiter = await getUserSession();
  console.log(recruiter);
  const recruiterCompany = await getRecruiterCompany(recruiter.id);
  console.log(recruiterCompany);
  return (
    <div>
      <div>
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6 text-white bg-[#121212]">
          {/* Profile Overview Header Card */}
          <Card
            className="bg-[#1c1c1e] border border-zinc-800 shadow-none p-6"
            radius="2xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <Avatar>
                  <Avatar.Image
                    alt={recruiterCompany.name}
                    src={recruiterCompany.logoUrl}
                  />
                  <Avatar.Fallback>JD</Avatar.Fallback>
                </Avatar>
                <div className="space-y-1">
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                    {recruiterCompany.name}
                  </h1>
                  <p className="text-emerald-400 text-sm font-medium flex items-center justify-center sm:justify-start gap-1.5">
                    <Building2 size={14} />
                    {recruiterCompany.industry} Industry
                  </p>
                </div>
              </div>

              {recruiterCompany.website && (
                <Button
                  as="a"
                  href={recruiterCompany.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black font-semibold shadow-md sm:w-auto w-full transition-colors hover:bg-zinc-200"
                  endContent={<ExternalLink size={14} />}
                  radius="lg"
                >
                  Visit Website
                </Button>
              )}
            </div>
          </Card>

          {/* Corporate Metadata Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Location Metric */}
            <Card
              className="bg-[#1c1c1e] border border-zinc-800 shadow-none p-4"
              radius="lg"
            >
              <div className="flex flex-row items-center gap-4">
                <div className="w-12 h-12 flex-shrink-0 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center border border-white/5">
                  <MapPin size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-zinc-500 text-xs font-medium">
                    Headquarters
                  </p>
                  <p className="text-base font-semibold truncate tracking-tight mt-0.5">
                    {recruiterCompany.location || "N/A"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Team Size Metric */}
            <Card
              className="bg-[#1c1c1e] border border-zinc-800 shadow-none p-4"
              radius="lg"
            >
              <div className="flex flex-row items-center gap-4">
                <div className="w-12 h-12 flex-shrink-0 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center border border-white/5">
                  <Users size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-zinc-500 text-xs font-medium">
                    Company Size
                  </p>
                  <p className="text-base font-semibold truncate tracking-tight mt-0.5">
                    {recruiterCompany.employees || "N/A"}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Corporate Description Panel */}
          <Card
            className="bg-[#1c1c1e] border border-zinc-800 shadow-none p-5"
            radius="xl"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-zinc-400 font-semibold text-xs uppercase tracking-wider">
                <Info size={14} className="text-emerald-400" />
                About the Organization
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed bg-[#121212] border border-zinc-800 rounded-xl p-4">
                {recruiterCompany.description ||
                  "No description provided for this business group."}
              </p>
            </div>
          </Card>
        </div>
      </div>
      <CompanyRegistration
        recruiter={recruiter}
        recruiterCompany={recruiterCompany}
      ></CompanyRegistration>
    </div>
  );
};

export default page;
