"use client";

import React, { useState } from "react";
import { Table, Chip, Button } from "@heroui/react";
import Link from "next/link";

function formatDate(dateInput) {
  if (!dateInput) return "N/A";
  const dateStr =
    typeof dateInput === "object" && dateInput.$date
      ? dateInput.$date
      : dateInput;
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function SeekerApplicationsList({
  applications = [],
  onWithdraw,
}) {
  const [apps, setApps] = useState(applications || []);
  const [loadingIds, setLoadingIds] = useState([]);

  const handleWithdraw = async (id) => {
    if (!confirm("Are you sure you want to withdraw this application?")) return;

    if (typeof onWithdraw === "function") {
      try {
        setLoadingIds((s) => [...s, id]);
        await onWithdraw(id);
        setApps((prev) =>
          prev.filter((a) => (a._id?.$oid || a._id || a.id) !== id),
        );
      } catch (err) {
        console.error("Withdraw failed:", err);
        alert("Failed to withdraw application.");
      } finally {
        setLoadingIds((s) => s.filter((x) => x !== id));
      }
      return;
    }

    // Best-effort: call DELETE on /api/applications/:id if available
    try {
      setLoadingIds((s) => [...s, id]);
      const res = await fetch(`/api/applications/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      setApps((prev) =>
        prev.filter((a) => (a._id?.$oid || a._id || a.id) !== id),
      );
    } catch (err) {
      console.error("Withdraw error:", err);
      alert("Unable to withdraw application (API may not exist).");
    } finally {
      setLoadingIds((s) => s.filter((x) => x !== id));
    }
  };

  if (!apps || apps.length === 0) {
    return (
      <div className="p-8 text-center text-zinc-400 bg-[#0b0b0b] rounded-2xl border border-zinc-900">
        You have not applied to any jobs yet.
      </div>
    );
  }

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Your Applications">
          <Table.Header>
            <Table.Column isRowHeader>Job</Table.Column>
            <Table.Column>Company</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Applied</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>

          <Table.Body>
            {apps.map((app) => {
              const id = app._id?.$oid || app._id || app.id || app.jobId;
              return (
                <Table.Row key={id}>
                  <Table.Cell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-white text-sm">
                        {app.jobTitle || app.title || app.job?.jobTitle}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {app.jobCategory || app.job?.jobCategory}
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="text-sm text-zinc-300">
                      {app.companyName || app.job?.companyName}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <Chip color="primary" variant="flat" size="sm">
                      {app.status || "pending"}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="text-sm text-zinc-500">
                      {formatDate(
                        app.createdAt || app.appliedAt || app.job?.createdAt,
                      )}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      {app.job?._id || app.jobId ? (
                        <Link
                          href={`/browseJobs/${app.job?._id || app.jobId}`}
                          className="text-sm text-zinc-300 hover:text-white"
                        >
                          View
                        </Link>
                      ) : (
                        <span className="text-sm text-zinc-600">—</span>
                      )}

                      <Button
                        size="sm"
                        variant="bordered"
                        onClick={() => handleWithdraw(id)}
                        disabled={loadingIds.includes(id)}
                      >
                        Withdraw
                      </Button>
                    </div>
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
