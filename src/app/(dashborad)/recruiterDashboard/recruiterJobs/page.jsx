import { getRecruiterCompany } from "@/app/lib/api/companies";
import { getUserSession } from "@/app/lib/core/session";
import Jobs from "@/components/recruiterDashboardComponent/Jobs";
import PostJobForm from "@/components/recruiterDashboardComponent/PostJobForm";

const page = async() => {
  const recruiter = await getUserSession();
  const recruiterCompany = await getRecruiterCompany(recruiter?.id);
  return (
    <>
      <div>
        <div>
          <div className="md:ml-5 lg:ml-15 sm:text-left text-center">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Manage Company Jobs
            </h1>
            <p className="text-sm text-zinc-500">
              Viewing jobs currently active or drafts for your company
            </p>
          </div>
          <Jobs></Jobs>
        </div>
        {recruiterCompany && (
          <PostJobForm recruiterCompany={recruiterCompany}></PostJobForm>
        )}
      </div>
      <div>
        {!recruiterCompany && (
          <div className="flex justify-center items-center h-[30vh] font-semibold text-3xl">
            <h1>At first register your company</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
