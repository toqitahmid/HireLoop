import React from "react";
// Import correct HeroUI v3 elements
import { InputGroup, Badge, Avatar } from "@heroui/react";
import { Magnifier, Bell } from "@gravity-ui/icons";

export default function Navbar() {
  return (
    <header className="w-full bg-[#111112] text-white pl-16 pr-4 md:px-6 py-3 flex items-center justify-between border-b border-zinc-900/50 gap-4">
      {/* 1. LEFT / CENTER: Expanded Search Bar (Using v3 InputGroup pattern) */}
      <div className="flex-1 max-w-2xl">
        <InputGroup className="w-full bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-colors">
          <InputGroup.Prefix className="text-zinc-500 pl-3">
            <Magnifier className="w-4 h-4 flex-shrink-0" />
          </InputGroup.Prefix>
          <InputGroup.Input
            type="text"
            placeholder="Search..."
            className="text-sm text-zinc-200 placeholder:text-zinc-600 bg-transparent py-2 pr-3 focus:outline-none"
          />
        </InputGroup>
      </div>

      {/* 2. RIGHT: Actions & User Info */}
      <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
        {/* Notification Bell (Using v3 Badge.Anchor compound layout) */}
        <button className="text-zinc-400 hover:text-white transition-colors relative p-1 mt-1">
          <Badge.Anchor>
            <Bell className="w-5 h-5" />
          </Badge.Anchor>
        </button>

        {/* Vertical Divider Line */}
        <div className="h-6 w-[1px] bg-zinc-800" />

        {/* User Workspace Profile Layout (Using v3 Avatar compound layout) */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="text-right hidden sm:block">
            <h3 className="text-sm font-semibold text-zinc-200 tracking-wide leading-tight">
              Alex Sterling
            </h3>
            <p className="text-[11px] text-zinc-600 font-medium">
              TechFlow Inc.
            </p>
          </div>

          <Avatar className="w-8 h-8 md:w-9 md:h-9 border border-zinc-800 rounded-full overflow-hidden">
            <Avatar.Image
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100"
              alt="Alex Sterling"
              className="object-cover w-full h-full"
            />
            <Avatar.Fallback>AS</Avatar.Fallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
