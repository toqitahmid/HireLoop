"use client";

import React, { useState, useMemo } from "react";
// Strict Hero UI version 3 layout imports
import { SearchField, Label, Select, ListBox } from "@heroui/react";
// Semantic lucide mapping icons
import {
  MapPin,
  Briefcase,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import JobCard from "./JobCard";

export default function FilterdJobs({ initialJobs = [] }) {
  // State variables for filter inputs (v3 maps to singular string values or arrays)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedWorkMode, setSelectedWorkMode] = useState("all");

  // 1. Extract Unique Data Arrays dynamically
  const categories = useMemo(() => {
    const sets = new Set(initialJobs.map((j) => j.jobCategory).filter(Boolean));
    return ["all", ...Array.from(sets)];
  }, [initialJobs]);

  const locations = useMemo(() => {
    const sets = new Set(initialJobs.map((j) => j.location).filter(Boolean));
    return ["all", ...Array.from(sets)];
  }, [initialJobs]);

  // 2. Client-Side Filtering Pipeline (Safeguarded against missing properties)
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      // 1. Safe Search Check: Fall back to empty strings if properties are missing
      const title = job?.jobTitle || "";
      const company = job?.companyName || "";
      const category = job?.jobCategory || "";

      const matchesSearch =
        searchQuery.trim() === "" ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Safe Dropdown Checks
      const matchesCategory =
        selectedCategory === "all" || job?.jobCategory === selectedCategory;

      const matchesLocation =
        selectedLocation === "all" || job?.location === selectedLocation;

      const matchesWorkMode =
        selectedWorkMode === "all" ||
        (selectedWorkMode === "remote" && job?.isRemote) ||
        (selectedWorkMode === "onsite" && !job?.isRemote);

      return (
        matchesSearch && matchesCategory && matchesLocation && matchesWorkMode
      );
    });
  }, [
    initialJobs,
    searchQuery,
    selectedCategory,
    selectedLocation,
    selectedWorkMode,
  ]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* --- FILTER INTERFACE BLOCK --- */}
      <div className="bg-[#121213] border border-zinc-900 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-2 border-b border-zinc-900 pb-4">
          <SlidersHorizontal className="w-4 h-4 text-orange-500" />
          <h2 className="text-sm font-semibold tracking-wide uppercase text-zinc-400">
            Filter Board
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* A. Search Field Input (Strict V3 Compound Anatomy) */}
          <div className="w-full">
            <SearchField
              value={searchQuery}
              onChange={setSearchQuery}
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className="text-xs font-semibold text-zinc-400 px-1">
                Find Opportunities
              </Label>
              <SearchField.Group className="flex items-center bg-zinc-950 border border-zinc-800 focus-within:border-zinc-700 rounded-xl px-3 py-2 transition-colors">
                <SearchField.SearchIcon className="w-4 h-4 text-zinc-500 mr-2 flex-shrink-0" />
                <SearchField.Input
                  placeholder="Title, company, keywords..."
                  className="w-full bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none"
                />
                {searchQuery && (
                  <SearchField.ClearButton
                    onClick={() => setSearchQuery("")}
                    className="text-xs text-zinc-500 hover:text-white ml-2"
                  >
                    ✕
                  </SearchField.ClearButton>
                )}
              </SearchField.Group>
            </SearchField>
          </div>

          {/* B. Category Filter Dropdown (Strict V3 Composition) */}
          <div className="w-full">
            <Select
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val || "all")}
              placeholder="Select Category"
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className="text-xs font-semibold text-zinc-400 px-1">
                Category
              </Label>
              <Select.Trigger className="flex items-center justify-between w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-300">
                <Select.Value />
                <Select.Indicator>
                  <ChevronDown size={14} className="text-zinc-500" />
                </Select.Indicator>
              </Select.Trigger>
              <Select.Popover className="bg-zinc-950 border border-zinc-900 rounded-xl p-1 shadow-2xl">
                <ListBox className="text-zinc-300">
                  {categories.map((cat) => (
                    <ListBox.Item
                      id={cat}
                      key={cat}
                      textValue={cat === "all" ? "All Categories" : cat}
                      className="px-3 py-2 hover:bg-zinc-900 rounded-lg cursor-pointer text-sm"
                    >
                      {cat === "all" ? "All Categories" : cat}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* C. Location Filter Dropdown (Strict V3 Composition) */}
          <div className="w-full">
            <Select
              value={selectedLocation}
              onChange={(val) => setSelectedLocation(val || "all")}
              placeholder="Select Location"
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className="text-xs font-semibold text-zinc-400 px-1 flex items-center gap-1">
                <MapPin size={12} className="text-pink-400" /> Location
              </Label>
              <Select.Trigger className="flex items-center justify-between w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-300">
                <Select.Value />
                <Select.Indicator>
                  <ChevronDown size={14} className="text-zinc-500" />
                </Select.Indicator>
              </Select.Trigger>
              <Select.Popover className="bg-zinc-950 border border-zinc-900 rounded-xl p-1 shadow-2xl">
                <ListBox className="text-zinc-300">
                  {locations.map((loc) => (
                    <ListBox.Item
                      id={loc}
                      key={loc}
                      textValue={loc === "all" ? "All Locations" : loc}
                      className="px-3 py-2 hover:bg-zinc-900 rounded-lg cursor-pointer text-sm"
                    >
                      {loc === "all" ? "All Locations" : loc}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* D. Work Mode Dropdown (Strict V3 Composition) */}
          <div className="w-full">
            <Select
              value={selectedWorkMode}
              onChange={(val) => setSelectedWorkMode(val || "all")}
              placeholder="Select Mode"
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className="text-xs font-semibold text-zinc-400 px-1 flex items-center gap-1">
                <Briefcase size={12} className="text-pink-400" /> Workplace Mode
              </Label>
              <Select.Trigger className="flex items-center justify-between w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-300">
                <Select.Value />
                <Select.Indicator>
                  <ChevronDown size={14} className="text-zinc-500" />
                </Select.Indicator>
              </Select.Trigger>
              <Select.Popover className="bg-zinc-950 border border-zinc-900 rounded-xl p-1 shadow-2xl">
                <ListBox className="text-zinc-300">
                  <ListBox.Item
                    id="all"
                    textValue="All Arrangements"
                    className="px-3 py-2 hover:bg-zinc-900 rounded-lg cursor-pointer text-sm"
                  >
                    All Arrangements
                  </ListBox.Item>
                  <ListBox.Item
                    id="remote"
                    textValue="Remote"
                    className="px-3 py-2 hover:bg-zinc-900 rounded-lg cursor-pointer text-sm"
                  >
                    Remote
                  </ListBox.Item>
                  <ListBox.Item
                    id="onsite"
                    textValue="On-site"
                    className="px-3 py-2 hover:bg-zinc-900 rounded-lg cursor-pointer text-sm"
                  >
                    On-site
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>
      </div>

      {/* --- GRID DISPLAY --- */}
      <div>
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-20 bg-[#121213] rounded-2xl border border-zinc-900">
            <p className="text-zinc-500 text-sm">
              No listings found matching your exact filter combination.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
