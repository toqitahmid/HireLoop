// "use client";
import { authClient } from "@/app/lib/auth-client";
import Jobs from "@/components/recruiterDashboardComponent/Jobs";
import StatGrid from "@/components/recruiterDashboardComponent/StatGrid";

const RecruiterPage = () => {
  return (
    <div className=" my-10 space-y-10">
      
      <div>
        <StatGrid></StatGrid>
        <Jobs></Jobs>
      </div>
    </div>
  );
};

export default RecruiterPage;
