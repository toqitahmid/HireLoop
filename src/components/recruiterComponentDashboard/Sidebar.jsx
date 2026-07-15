import React from "react";
import { Drawer, Button, Avatar } from "@heroui/react";

import {
  LayoutGrid,
  Building2,
  Briefcase,
  FileText,
  Settings,
} from "lucide-react";
import { Menu, X } from "lucide-react";

// Nav items set up to match the items in your screenshot
const navItems = [
  {
    label: "Dashboard",
    href: "/recruiterDashboard/recruiterHomeDashboard",
    icon: LayoutGrid,
    active: true,
  },
  {
    label: "My Company",
    href: "/recruiterDashboard/recruiterCompany",
    icon: Building2,
    active: false,
  },
  {
    label: "Manage Jobs",
    href: "/recruiterDashboard/recruiterJobs",
    icon: Briefcase,
    active: false,
  },
  {
    label: "Applications",
    href: "/recruiterDashboard/recruiterJobs",
    icon: FileText,
    active: false,
  },
  {
    label: "Settings",
    href: "/recruiterDashboard/recruiterSettings",
    icon: Settings,
    active: false,
  },
];

export default function Sidebar() {
  // Render function for the navigation links to keep the file clean
  const renderNavLinks = () => (
    <nav className="flex-1 space-y-1 w-full">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={`flex items-center justify-between w-full py-4 px-6 transition-all duration-200 group relative ${
            item.active
              ? "bg-zinc-800/60 text-white"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <div className="flex items-center gap-4">
            <item.icon
              className={`w-5 h-5 ${item.active ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`}
            />
            <span className="text-[15px] font-medium tracking-wide">
              {item.label}
            </span>
          </div>

          {/* The white vertical line indicator on the right side for the active tab */}
          {item.active && (
            <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-white h-full" />
          )}
        </a>
      ))}
    </nav>
  );

  // Render function for the branding and User profile card
  const renderHeaderAndUser = () => (
    <div className="px-6 pt-6 pb-4 w-full">
      {/* Brand Logo */}
      <h1 className="text-2xl font-bold text-white tracking-tight mb-8">
        HireLoop
      </h1>

      {/* User Card Layout */}
      <div className="flex flex-col items-start mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Avatar
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100"
            className="w-11 h-11 rounded-md object-cover border border-zinc-800"
            radius="sm"
          />
          <div>
            <h2 className="text-sm font-semibold text-zinc-200 tracking-wide">
              Alex Sterling
            </h2>
            <p className="text-xs text-zinc-500 font-medium">Recruiter</p>
          </div>
        </div>
        {/* Premium Account Badge */}
        <span className="text-[10px] font-bold tracking-wider text-zinc-300 bg-zinc-800/80 border border-zinc-700 px-2 py-1 rounded-sm uppercase">
          Premium Account
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* ========================================================= */}
      {/* 1. DESKTOP SIDEBAR (Visible on md screens and up)        */}
      {/* ========================================================= */}
      <aside className="hidden md:flex flex-col w-60 h-screen bg-[#111112] text-zinc-100 sticky top-0 border-r border-zinc-900/50">
        {renderHeaderAndUser()}
        <div className="mt-4 flex-1">{renderNavLinks()}</div>
      </aside>

      {/* ========================================================= */}
      {/* 2. MOBILE DRAWER (Visible on screens below md)            */}
      {/* ========================================================= */}
      <div className="md:hidden">
        <Drawer>
          {/* Mobile floating trigger button */}
          <Button
            isIconOnly
            variant="light"
            className="fixed top-4 left-4 z-50 text-white bg-[#111112] border border-zinc-800 shadow-xl"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <Drawer.Backdrop variant="blur">
            <Drawer.Content
              placement="left"
              className="w-64 bg-[#111112] text-zinc-100 p-0"
            >
              <Drawer.Dialog className="h-full flex flex-col pt-4 relative">
                {/* Close Trigger Button for Mobile Panel */}
                <Drawer.CloseTrigger>
                  <div
                    role="button"
                    aria-label="Close drawer"
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </div>
                </Drawer.CloseTrigger>

                {renderHeaderAndUser()}

                <Drawer.Body className="flex-1 px-0 mt-4 overflow-y-auto">
                  {renderNavLinks()}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}
