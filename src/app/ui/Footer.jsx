"use client";

import React from "react";
import { Button } from "@heroui/react";

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: ["Job discovery", "Worker AI", "Companies", "Salary data"],
    },
    {
      title: "Navigations",
      links: ["Help center", "Career library", "Contact"],
    },
    {
      title: "Resources",
      links: ["Brand Guideline", "Newsroom"],
    },
  ];

  return (
    <footer className="w-full bg-zinc-950 text-white flex flex-col items-center">
      {/* --- UPPER CTA SECTION (Inverted Grid Dome) --- */}
      <div className="relative w-full max-w-5xl mx-auto px-6 overflow-hidden pt-24 pb-16 flex flex-col items-center justify-center text-center">
        {/* Glow behind the grid dome */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[65%] aspect-square max-h-[400px] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none z-0" />

        {/* The Grid Dome Container */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full aspect-[2/1] max-w-[950px] overflow-hidden rounded-b-full border-b border-blue-500/20 bg-zinc-950 z-0">
          {/* Simulated Perspective Grid Overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at top, transparent 20%, #09090b 85%),
                linear-gradient(to right, rgba(59, 130, 246, 0.2) 1px, transparent 1px), 
                linear-gradient(to bottom, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: "100% 100%, 40px 40px, 40px 40px",
            }}
          />
        </div>

        {/* CTA Content */}
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Your next role is <br /> already looking for you
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-md">
            Build a profile in three minutes. The matches start arriving
            tomorrow morning.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              radius="full"
              className="bg-white text-zinc-950 font-medium px-6 h-11 hover:bg-zinc-200 transition-colors shadow-lg"
            >
              Create a free account
            </Button>
            <Button
              variant="bordered"
              radius="full"
              className="border-zinc-800 hover:border-zinc-700 text-zinc-300 font-medium px-6 h-11 bg-zinc-900/40 backdrop-blur-sm transition-colors"
            >
              View pricing
            </Button>
          </div>
        </div>
      </div>

      {/* --- LOWER FOOTER DIRECTORY --- */}
      <div className="w-full max-w-6xl mx-auto px-6 pt-16 pb-8 z-10">
        {/* Links & Brand Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-900">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start max-w-sm">
            {/* Logo placeholder mimicking hireloop matching colors */}
            <div className="flex items-center gap-1 text-2xl font-black tracking-tight text-blue-500">
              hire<span className="text-orange-500">l</span>
              <div className="w-3.5 h-3.5 rounded-full border-2 border-orange-500 flex items-center justify-center -mx-0.5">
                <div className="w-1 h-1 rounded-full bg-blue-400" />
              </div>
              <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-orange-400" />
              </div>
              <span className="text-orange-500 -ml-0.5">p</span>
            </div>
            <p className="mt-4 text-xs sm:text-sm text-zinc-500 leading-relaxed font-normal">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Dynamic Link Groups */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 md:justify-items-end">
            {footerLinks.map((group, index) => (
              <div key={index} className="flex flex-col gap-3 min-w-[120px]">
                <h4 className="text-xs font-semibold text-indigo-400/90 tracking-wider uppercase">
                  {group.title}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href="#"
                        className="text-xs sm:text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        {group.links[linkIdx]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Social Icons Stack */}
        <div className="flex items-center gap-2">
          {/* Facebook Custom SVG */}
          <a
            href="#"
            className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>

          {/* Custom Pinterest Vector Icon */}
          <a
            href="#"
            className="w-8 h-8 rounded-lg bg-indigo-950/40 border border-indigo-900/40 flex items-center justify-center text-indigo-400 hover:text-indigo-300 transition-all"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.23 2.64 7.85 6.39 9.34-.1-.79-.19-2 .04-2.87.21-.79 1.34-5.77 1.34-5.77s-.34-.68-.34-1.69c0-1.58.92-2.76 2.06-2.76 1 0 1.46.74 1.46 1.63 0 .99-.64 2.49-.97 3.87-.27 1.15.58 2.08 1.71 2.08 2.06 0 3.64-2.17 3.64-5.3 0-2.77-2-4.71-4.83-4.71-3.3 0-5.23 2.47-5.23 5.03 0 1 .38 2.07.86 2.65.1.11.11.21.08.33l-.32 1.3c-.05.21-.17.26-.39.16-1.45-.68-2.35-2.8-2.35-4.5 0-3.66 2.66-7.02 7.67-7.02 4.03 0 7.16 2.87 7.16 6.7 0 4.01-2.52 7.24-6.02 7.24-1.18 0-2.28-.61-2.66-1.33l-.72 2.76c-.26 1.01-.97 2.28-1.45 3.06C10.61 21.82 11.29 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
          </a>

          {/* LinkedIn Custom SVG */}
          <a
            href="#"
            className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
