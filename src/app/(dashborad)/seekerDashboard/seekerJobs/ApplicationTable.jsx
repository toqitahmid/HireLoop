"use client";

import React from "react";
import { Table, Chip, Link, Button } from "@heroui/react";

export default function ApplicantTable({ jobs }) {
  const formatDate = (dateInput) => {
    if (!dateInput) return "N/A";

    const dateStr =
      typeof dateInput === "object" && dateInput.$date
        ? dateInput.$date
        : dateInput;

    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!jobs || jobs.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No job applications found.
      </div>
    );
  }

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Job Applications Table">
          <Table.Header>
            {/* Fix applied here */}
            <Table.Column isRowHeader>Applicant</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Links</Table.Column>
            <Table.Column>Applied Date</Table.Column>
          </Table.Header>
          <Table.Body>
            {jobs.map((job) => {
              const rowId = job._id?.$oid || job._id || job.jobId;

              return (
                <Table.Row key={rowId}>
                  <Table.Cell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {job.applicantName}
                      </span>
                      <span className="text-sm text-gray-500">
                        {job.applicantEmail}
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <Chip color="primary" variant="flat" size="sm">
                      {job.status}
                    </Chip>
                  </Table.Cell>


                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      {job.resumeLink && (
                        <Button
                          as={Link}
                          href={job.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="sm"
                          variant="bordered"
                        >
                          Resume
                        </Button>
                      )}
                      {job.githubLink && (
                        <Button
                          as={Link}
                          href={job.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="sm"
                          variant="flat"
                        >
                          GitHub
                        </Button>
                      )}
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="text-sm text-gray-500">
                      {formatDate(job.createdAt)}
                    </span>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
