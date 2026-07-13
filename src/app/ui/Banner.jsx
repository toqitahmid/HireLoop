"use client";

import React from "react";
import { Button } from "@heroui/react";
import AppNavbar from "./Navbar";
import Image from "next/image";

import bannerImage from "../../../public/assets/earth-map.jpg";

const HeroBanner = () => {
  const trendingPositions = [
    "Product Designer",
    "AI Engineering",
    "Dev-ops Engineer",
  ];

  const stats = [
    {
      value: "50K",
      label: "Active Jobs",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-400"
        >
          <path d="M15 2H9a2 2 0 0 0-2 2v2h10V4a2 2 0 0 0-2-2z" />
          <rect width="20" height="14" x="2" y="6" rx="2" />
        </svg>
      ),
    },
    {
      value: "12K",
      label: "Companies",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-400"
        >
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 7h.01" />
          <path d="M16 7h.01" />
          <path d="M8 11h.01" />
          <path d="M16 11h.01" />
        </svg>
      ),
    },
    {
      value: "2M",
      label: "Job Seekers",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-400"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
          <path d="M11 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
        </svg>
      ),
    },
    {
      value: "97%",
      label: "Satisfaction Rate",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-400"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-zinc-950 pb-16 text-white flex flex-col items-center justify-between">

      {/* Background Star Field Gradient Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.3),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 pt-12 text-center flex flex-col items-center z-10">
        {/* Upper Floating Pill Notification */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-zinc-800/60 bg-zinc-900/40 px-4 py-1.5 backdrop-blur-md">
          <span role="img" aria-label="briefcase">
            💼
          </span>
          <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400">
            <strong className="text-white font-mono mr-1">50,000+</strong> New
            Jobs This Month
          </span>
        </div>

        {/* Central Bold Header */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-300 max-w-3xl leading-tight">
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 max-w-xl text-sm sm:text-base text-zinc-400 leading-relaxed">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Combined Dual Search Box Layout */}
        <div className="mt-8 w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900/60 p-2 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center gap-2">
          {/* Column 1: Job Search */}
          <div className="flex flex-1 items-center gap-2.5 w-full px-3 py-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-zinc-500"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
            />
          </div>

          {/* Desktop Separator Line */}
          <div className="hidden md:block h-6 w-[1px] bg-zinc-800" />

          {/* Column 2: Location */}
          <div className="flex flex-1 items-center gap-2.5 w-full px-3 py-1.5 border-t border-zinc-800 md:border-t-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-zinc-500"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <input
              type="text"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
            />
          </div>

          {/* Core Action Button */}
          <Button
            isIconOnly
            radius="xl"
            className="w-full md:w-12 h-12 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Button>
        </div>

        {/* Subordinate Trending Positions */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-zinc-500 font-medium">Trending Position:</span>
          {trendingPositions.map((position, idx) => (
            <span
              key={idx}
              className="cursor-pointer rounded-full border border-zinc-800 bg-zinc-900/30 px-3 py-1 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
            >
              {position}
            </span>
          ))}
        </div>
      </div>

      {/* Real Earth Backdrop Globe Frame */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center mt-6 md:mt-12 px-6 z-10">
        {/* Dynamic Atmospheric Neon Blue Aura Behind the Globe */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[85%] aspect-square max-h-[380px] rounded-full bg-blue-600/25 blur-[100px] pointer-events-none z-0" />
        {/* Dome Container matching a perfect semi-circle dome geometry */}
        <div className="relative w-full aspect-[2/1] max-w-[900px] overflow-hidden rounded-t-full border-t border-l border-r border-blue-500/30 bg-zinc-950 shadow-[0_-25px_50px_-12px_rgba(37,99,235,0.25)] flex flex-col justify-end pb-12 z-10">
          {/* Static Optimized Local Next Image Element */}
          <div className="absolute inset-0 w-full h-full select-none pointer-events-none z-0">
            <Image
              src={bannerImage}
              alt="Real Earth night satellite map background"
              fill
              priority
              placeholder="blur"
              className="object-cover object-bottom scale-110 origin-bottom opacity-60"
            />
          </div>

          {/* Spherical Depth Shadow: Curves the flat map texture to make it look perfectly round */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center_bottom,transparent_45%,rgba(9,9,11,0.9)_90%)] z-10 pointer-events-none" />

          {/* Bottom horizon blend gradient */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent z-10" />

          {/* Secondary CTA Text Layout */}
          <div className="text-center px-4 max-w-xl mx-auto relative z-20">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-300">
              Assisting over{" "}
              <span className="text-white font-bold border-b border-zinc-700 pb-0.5">
                15,000 job seekers
              </span>{" "}
              find their dream positions.
            </h3>
          </div>
        </div>
      </div>

      {/* Grid Stats Container */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 px-6 relative z-20 -mt-2">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between items-start p-6 rounded-2xl border border-zinc-900 bg-zinc-900/40 backdrop-blur-md min-h-[140px] shadow-xl hover:border-zinc-800/80 transition-all group"
          >
            <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800/60 group-hover:border-zinc-700 transition-colors">
              {stat.icon}
            </div>
            <div className="mt-4 text-left">
              <div className="text-3xl font-bold tracking-tight text-white font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-400 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
