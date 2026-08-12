import { Suspense } from "react";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-[60vh]">
          Loading...
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
