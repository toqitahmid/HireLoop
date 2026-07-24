import { getAllCompanies } from "@/app/lib/api/companies";
import CompanyTable from "./CompanyTable";

const page = async () => {
  const companies = await getAllCompanies();

  return (
    <main className="p-6 min-h-screen">
      <CompanyTable initialCompanies={companies} />
    </main>
  );
};

export default page;
