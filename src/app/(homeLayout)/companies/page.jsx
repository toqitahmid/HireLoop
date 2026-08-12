import { getAllCompanies } from "@/app/lib/api/companies";
import CompaniesGrid from "./CompaniesGrid";

const CompaniesPage = async () => {
  const companies = await getAllCompanies();

  return (
    <div className="min-h-screen bg-[#FAFAF8] px-4 py-10 dark:bg-zinc-950 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-teal-950 dark:text-white sm:text-3xl">
            Companies
          </h1>
          <p className="text-sm text-teal-950/50 dark:text-white/50">
            {companies.length} companies registered on the platform
          </p>
        </div>

        <CompaniesGrid companies={companies} />
      </div>
    </div>
  );
};

export default CompaniesPage;
