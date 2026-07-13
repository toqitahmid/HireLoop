"use client";

import React, { useState } from "react";
import { Link, Button } from "@heroui/react";
import { Menu, X } from "lucide-react";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Browse Jobs", href: "#" },
    { label: "Company", href: "#" },
    { label: "Pricing", href: "#" },
  ];

  return (
    <div className="w-full px-4 pt-4 pb-20 relative z-50">
      {/* Main Floating Navbar Container */}
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border border-zinc-800/80  px-6 shadow-2xl backdrop-blur-md">
        {/* Brand / Logo Section */}
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

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Action Buttons (Sign In / Get Started) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="h-6 w-[1px] bg-zinc-800" /> {/* Divider Element */}
          <Link
            href="#"
            className="text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors duration-200 px-3"
          >
            Sign In
          </Link>
          <Button
            as={Link}
            href="#"
            radius="lg"
            className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_25px_rgba(79,70,229,0.6)] hover:scale-[1.02] transition-all duration-300 px-6 py-2"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile View Drawer Menu Panel */}
      {isMenuOpen && (
        <div className="absolute top-24 left-4 right-4 md:hidden flex flex-col gap-5 rounded-2xl border border-zinc-900 bg-zinc-950/95 p-6 shadow-2xl backdrop-blur-lg animate-in fade-in slide-in-from-top-4 duration-200">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="w-full text-zinc-300 hover:text-white text-lg py-2 border-b border-zinc-900"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-4 mt-4">
            <Link
              href="#"
              className="text-center text-zinc-400 hover:text-white font-medium py-3 rounded-xl border border-zinc-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
            <Button
              as={Link}
              href="#"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-6 rounded-xl text-center shadow-lg shadow-indigo-600/30"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
