import { getUserSession } from "@/app/lib/core/session";
import CompanyRegistration from "./CompanyRegistration";
import { getCompany } from "@/app/lib/api/companies";

const page = async() => {
    const recruiter = await getUserSession();
    console.log(recruiter);
    const recruiterCompany = await getCompany(recruiter.id);
    console.log(recruiterCompany);
    return (
        <div>
            <h2 className="text-4xl">{recruiterCompany.name}</h2>
            <CompanyRegistration recruiter={recruiter}></CompanyRegistration>
        </div>
    );
};

export default page;