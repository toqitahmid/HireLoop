import { getUserSession, requiredRole } from "@/app/lib/core/session";
import Jobs from "@/components/recruiterDashboardComponent/Jobs";
import StatGrid from "@/components/recruiterDashboardComponent/StatGrid";

const RecruiterPage = async() => {
  const user = await getUserSession();
  await requiredRole('recruter');
  console.log(user);
  return (
    <div className=" my-10 space-y-10">
      <div>
        <h2 className="font-semibold text-3xl lg:ml-17 md:ml-7 text-center sm:text-left">WELCOME BACK <span className="text-amber-500">{user?.name.toLocaleUpperCase()}</span></h2>
      </div>
      <div>
        <StatGrid></StatGrid>
        <Jobs></Jobs>
      </div>
    </div>
  );
};

export default RecruiterPage;
