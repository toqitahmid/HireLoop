import Navbar from "@/components/recruiterDashboardComponent/Navbar";
import Sidebar from "@/components/recruiterDashboardComponent/Sidebar";
import React from "react";


const RecruiterDashboardLayout = ({ children }) => {
  return (
    // Outer wrapper replacing the body tag
    <div className="flex min-h-screen bg-[#111112] text-white antialiased">
      {/* 1. SIDEBAR: Stays sticky on desktop, handles its own mobile drawer overlay */}
      <Sidebar />

      {/* 2. MAIN CONTENT AREA: Stacks vertically (Navbar top, Main content bottom) */}
      <div className="flex flex-col flex-1 min-w-0 w-full">
        {/* NAVBAR: Spans the full width of the remaining viewport */}
        <Navbar />

        {/* MAIN PANEL: Where your dashboard content page actually renders */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-zinc-950/40">
          {children}
        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboardLayout;
