import Jobs from "@/components/recruiterDashboardComponent/Jobs";
import PostJobForm from "@/components/recruiterDashboardComponent/PostJobForm";

const page = () => {
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
        <PostJobForm ></PostJobForm>
      </div>
    </>
  );
};

export default page;
