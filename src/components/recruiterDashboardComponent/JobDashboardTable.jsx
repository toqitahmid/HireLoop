"use client";

import React from "react";
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import {
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  Eye,
  Edit3,
  Trash2,
} from "lucide-react";

export default function JobDashboardTable({ jobs = [] }) {
  // Format salary with currency symbol
  const formatSalaryRange = (min, max, currency) => {
    const symbol = currency === "USD" ? "$" : `${currency} `;
    return `${symbol}${Number(min).toLocaleString()} - ${symbol}${Number(max).toLocaleString()}`;
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!jobs || jobs.length === 0) {
    return (
      <div className="w-full p-8 text-center bg-zinc-950/5 border border-zinc-200/80 dark:border-zinc-800/40 rounded-xl">
        <p className="text-zinc-500 text-sm font-medium">
          No jobs found for this company.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* ========================================================= */}
      {/* 1. MOBILE VIEW: Stacked Cards (Visible below md)          */}
      {/* ========================================================= */}
      <div className="block md:hidden space-y-3">
        {jobs.map((job) => {
          const jobId = job._id?.$oid || job._id || job.id;

          return (
            <div
              key={jobId}
              className="p-4 bg-zinc-950/20 rounded-xl border border-zinc-200/80 dark:border-zinc-800/40 flex flex-col gap-3"
            >
              {/* Header: Title & Status */}
              <div className="flex justify-between items-start gap-2">
                <div className="flex gap-2.5 items-center">
                  <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                      {job.jobTitle}
                    </h3>
                    <p className="text-xs text-zinc-500 font-medium">
                      {job.companyName}
                    </p>
                  </div>
                </div>
                <Chip
                  size="sm"
                  variant="dot"
                  color={job.status ? "success" : "danger"}
                  className="font-medium shrink-0"
                >
                  {job.status ? "Active" : "Closed"}
                </Chip>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-2 gap-y-2 gap-x-1 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                {/* Location */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
                    Location
                  </span>
                  <div className="flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                </div>

                {/* Job Type */}
                <div className="flex flex-col gap-0.5 items-start">
                  <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
                    Type
                  </span>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={job.isRemote ? "secondary" : "default"}
                    className="text-[10px] font-semibold h-5 px-1.5"
                  >
                    {job.isRemote ? "Remote" : "On-Site"}
                  </Chip>
                </div>

                {/* Salary */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
                    Salary
                  </span>
                  <div className="flex items-center gap-0.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>
                      {formatSalaryRange(
                        job.minSalary,
                        job.maxSalary,
                        job.currency,
                      )}
                    </span>
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
                    Deadline
                  </span>
                  <div className="flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>{formatDate(job.deadline)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                <Button
                  size="sm"
                  variant="flat"
                  className="text-zinc-500 bg-zinc-100 dark:bg-zinc-800/50 hover:text-zinc-900"
                  onPress={() => console.log("View", jobId)}
                >
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  color="primary"
                  onPress={() => console.log("Edit", jobId)}
                >
                  <Edit3 className="w-3.5 h-3.5 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  color="danger"
                  onPress={() => console.log("Delete", jobId)}
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 2. DESKTOP VIEW: Full HeroUI Table (Visible on md and up) */}
      {/* ========================================================= */}
      <div className="hidden md:block p-2 bg-zinc-950/20 rounded-xl border border-zinc-200/80 dark:border-zinc-800/40">
        <Table aria-label="Recruiter Jobs Dashboard" variant="secondary">
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column isRowHeader>Job & Company</Table.Column>
                <Table.Column>Location & Type</Table.Column>
                <Table.Column>Salary Range</Table.Column>
                <Table.Column>Deadline</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column align="start">Actions</Table.Column>
              </Table.Header>

              <Table.Body>
                {jobs.map((job) => {
                  const jobId = job._id?.$oid || job._id || job.id;

                  return (
                    <Table.Row key={jobId}>
                      {/* 1. Job Title & Company */}
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg">
                            <Briefcase className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                              {job.jobTitle}
                            </div>
                            <div className="text-xs text-zinc-500 font-medium">
                              {job.companyName}
                            </div>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* 2. Location & Work Type */}
                      <Table.Cell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400">
                            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                            <span>{job.location}</span>
                          </div>
                          <div>
                            <Chip
                              size="sm"
                              variant="flat"
                              color={job.isRemote ? "secondary" : "default"}
                              className="text-[10px] font-semibold h-5 px-1.5"
                            >
                              {job.isRemote ? "Remote" : "On-Site"}
                            </Chip>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* 3. Salary Range */}
                      <Table.Cell>
                        <div className="flex items-center gap-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          <DollarSign className="w-4 h-4 text-emerald-500" />
                          <span>
                            {formatSalaryRange(
                              job.minSalary,
                              job.maxSalary,
                              job.currency,
                            )}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* 4. Deadline */}
                      <Table.Cell>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{formatDate(job.deadline)}</span>
                        </div>
                      </Table.Cell>

                      {/* 5. Status Badge */}
                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="dot"
                          color={job.status ? "success" : "danger"}
                          className="font-medium"
                        >
                          {job.status ? "Active" : "Closed"}
                        </Chip>
                      </Table.Cell>

                      {/* Actions Panel */}
                      <Table.Cell>
                        <div className="flex items-center gap-1">
                          <Tooltip content="View Details">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 min-w-8 w-8 h-8"
                              onPress={() => console.log("View", jobId)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Tooltip>

                          <Tooltip content="Edit Job">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 min-w-8 w-8 h-8"
                              onPress={() => console.log("Edit", jobId)}
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                          </Tooltip>

                          <Tooltip content="Delete Job" color="danger">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              className="text-danger hover:bg-danger-50 dark:hover:bg-danger-950/30 min-w-8 w-8 h-8"
                              onPress={() => console.log("Delete", jobId)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </Tooltip>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
}
