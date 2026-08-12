import { Suspense } from "react";
import LogInForm from "./LogInForm";

const LogInPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-[60vh]">
          Loading...
        </div>
      }
    >
      <LogInForm />
    </Suspense>
  );
};

export default LogInPage;
