"use client";

import React, { useState } from "react";
import { Card, Separator, Button, Switch } from "@heroui/react";
import { createJob } from "@/app/lib/actions/jobs";
import { toast, Zoom } from "react-toastify";
import { redirect } from "next/navigation";

export default function PostJobForm() {
  const [formData, setFormData] = useState({
    status: true,
    isRemote: false,
    currency: "USD",
  });

  // Minimal logic for the active job limits (Growth Plan: 4/10 active)
  const canPost = true;

  const handleInput = (e) =>{
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    const res = await createJob(formData);
    if(res.insertedId){
      toast.success("Job posted successfully", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
      redirect('/dashboard/recruiter')
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-[#18181b] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="p-6 pb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-neutral-100">
              Post New Job
            </h2>
            <button type="button" className="text-neutral-400 hover:text-white">
              ✕
            </button>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Enter details to start sourcing on HireLoop.
          </p>
        </div>

        <Separator className="bg-neutral-800" />

        {/* Form Body */}
        <form
          onSubmit={handleOnSubmit}
          className="p-6 space-y-6"
        >
          {/* Job Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-neutral-400 block mb-1.5">
                Job Title
              </label>
              <input
                name="jobTitle"
                required
                onChange={handleInput}
                placeholder="e.g. Acme Corp"
                className="w-full text-sm bg-[#222226] border border-neutral-800 focus:border-neutral-600 rounded-lg p-2.5 outline-none text-neutral-200"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-400 block mb-1.5">
                Job Category
              </label>
              <select
                name="jobCategory"
                onChange={handleInput}
                className="w-full text-sm bg-[#222226] border border-neutral-800 focus:border-neutral-600 rounded-lg p-2.5 outline-none text-neutral-200"
              >
                <option>Technology</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-400 block mb-1.5">
                Job Type
              </label>
              <select
                name="jobType"
                onChange={handleInput}
                className="w-full text-sm bg-[#222226] border border-neutral-800 focus:border-neutral-600 rounded-lg p-2.5 outline-none text-neutral-200"
              >
                {["Full-time", "Part-time", "Remote", "Contract"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-400 block mb-1.5">
                Application Deadline
              </label>
              <input
                type="date"
                name="deadline"
                required
                onChange={handleInput}
                className="w-full text-sm bg-[#222226] border border-neutral-800 focus:border-neutral-600 rounded-lg p-2.5 outline-none text-neutral-200"
              />
            </div>
          </div>

          {/* Location Layer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-neutral-400 block mb-1.5">
                Location
              </label>
              <input
                name="location"
                disabled={formData.workplaceType === "Remote"}
                placeholder={
                  formData.workplaceType === "Remote"
                    ? "Remote Working"
                    : "City, Country"
                }
                value={
                  formData.workplaceType === "Remote"
                    ? "Remote"
                    : formData.location || ""
                }
                onChange={handleInput}
                className="w-full text-sm bg-[#222226] border border-neutral-800 focus:border-neutral-600 rounded-lg p-2.5 outline-none text-neutral-200 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-400 block mb-1.5">
                Workplace Type
              </label>
              <select
                name="workplaceType"
                value={formData.workplaceType || "Onsite"}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({
                    ...formData,
                    workplaceType: value,
                    // Clear location or set to Remote depending on selection
                    location: value === "Remote" ? "Remote" : "",
                  });
                }}
                className="w-full text-sm bg-[#222226] border border-neutral-800 focus:border-neutral-600 rounded-lg p-2.5 outline-none text-neutral-200"
              >
                <option value="Onsite">Onsite</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Salary Grid */}
          <div className="grid grid-cols-3 gap-3">
            {["Min Salary", "Max Salary"].map((label, idx) => (
              <div key={label}>
                <label className="text-xs font-medium text-neutral-400 block mb-1.5">
                  {label}
                </label>
                <input
                  type="number"
                  name={idx === 0 ? "minSalary" : "maxSalary"}
                  placeholder="0"
                  onChange={handleInput}
                  className="w-full text-sm bg-[#222226] border border-neutral-800 focus:border-neutral-600 rounded-lg p-2.5 outline-none text-neutral-200"
                />
              </div>
            ))}
            <div>
              <label className="text-xs font-medium text-neutral-400 block mb-1.5">
                Currency
              </label>
              <select
                name="currency"
                onChange={handleInput}
                className="w-full text-sm bg-[#222226] border border-neutral-800 focus:border-neutral-600 rounded-lg p-2.5 outline-none text-neutral-200"
              >
                {["USD", "EUR", "GBP"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Scopes & Textareas */}
          {["Responsibilities", "Requirements", "Benefits (Optional)"].map(
            (label) => (
              <div key={label}>
                <label className="text-xs font-medium text-neutral-400 block mb-1.5">
                  {label}
                </label>
                <textarea
                  name={label.toLowerCase().split(" ")[0]}
                  rows={2}
                  onChange={handleInput}
                  placeholder={`Enter ${label.toLowerCase()} details...`}
                  className="w-full text-sm bg-[#222226] border border-neutral-800 focus:border-neutral-600 rounded-lg p-2.5 outline-none text-neutral-200 resize-none"
                />
              </div>
            ),
          )}

          <Separator className="bg-neutral-800" />

          {/* Actions Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="bordered"
              className="border-neutral-800 text-neutral-300 rounded-lg text-sm px-5 py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!canPost}
              className="bg-white text-black font-semibold rounded-lg text-sm px-5 py-2 hover:bg-neutral-200 transition-colors"
            >
              Publish Job
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
