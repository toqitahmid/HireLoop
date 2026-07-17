import { getAllJobs } from "@/app/lib/api/jobs";
import JobCard from "./JobCard";
import FilterdJobs from "./FilterJobs";

const page = async() => {
    const jobs = await getAllJobs();
    console.log("Jobs fetched in page.jsx:", jobs);
    return (
      <div>
        <div>
          <FilterdJobs initialJobs={jobs}></FilterdJobs>
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {jobs.map((job) => (
            <div key={job._id}>
              <JobCard job={job}></JobCard>
            </div>
          ))}
        </div> */}
      </div>
    );
};

export default page;