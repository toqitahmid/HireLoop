"use client";

import React, { useState } from "react";
import { Table } from "@heroui/react";
import {
  Globe,
  MapPin,
  Persons,
  Check,
  Xmark,
  Clock,
  ArrowUpRight,
} from "@gravity-ui/icons";
import { updateCompanyStatus } from "@/app/lib/actions/companies";

export default function CompanyTable({ initialCompanies = [] }) {
  const [companies, setCompanies] = useState(initialCompanies);

  const handleStatusChange = async (id, newStatus) => {

    const prevCompanies = [...companies];
    setCompanies((prev) =>
      prev.map((company) =>
        (company._id?.$oid || company._id) === id
          ? { ...company, status: newStatus }
          : company,
      ),
    );

    try{
      await updateCompanyStatus(id, newStatus)
    }
    catch(error){
      setCompanies(prevCompanies);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Check className="w-3.5 h-3.5" /> Approved
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Xmark className="w-3.5 h-3.5" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
    }
  };

  const renderActionButtons = (companyId, currentStatus) => (
    <div className="flex items-center gap-2">
      {currentStatus !== "Approved" && (
        <button
          onClick={() => handleStatusChange(companyId, "Approved")}
          className="inline-flex items-center justify-center gap-1.5 text-xs px-3 py-1.5 sm:py-1 rounded-lg bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 active:bg-emerald-500/35 transition-colors font-medium border border-emerald-500/30 flex-1 sm:flex-initial"
        >
          <Check className="w-3.5 h-3.5" />
          Approve
        </button>
      )}

      {currentStatus !== "Rejected" && (
        <button
          onClick={() => handleStatusChange(companyId, "Rejected")}
          className="inline-flex items-center justify-center gap-1.5 text-xs px-3 py-1.5 sm:py-1 rounded-lg bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 active:bg-rose-500/35 transition-colors font-medium border border-rose-500/30 flex-1 sm:flex-initial"
        >
          <Xmark className="w-3.5 h-3.5" />
          Reject
        </button>
      )}

      {currentStatus !== "Pending" && (
        <button
          onClick={() => handleStatusChange(companyId, "Pending")}
          className="inline-flex items-center justify-center gap-1.5 text-xs px-3 py-1.5 sm:py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 active:bg-slate-600 transition-colors font-medium border border-slate-700 flex-1 sm:flex-initial"
        >
          <Clock className="w-3.5 h-3.5" />
          Reset
        </button>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 rounded-xl border border-slate-800 text-slate-100 shadow-xl">
      {/* Header */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-50">
            Companies ({companies.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Review company submissions and manage status.
          </p>
        </div>
      </div>

      {/* MOBILE VIEW (Card Layout < 640px) */}
      <div className="flex flex-col gap-3 sm:hidden">
        {companies.map((company) => {
          const companyId = company._id?.$oid || company._id;

          return (
            <div
              key={companyId}
              className="p-4 bg-slate-800/60 rounded-xl border border-slate-800 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={company.logoUrl}
                    alt={`${company.name} logo`}
                    className="w-10 h-10 rounded-lg object-cover border border-slate-700 bg-slate-800"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/40/1e293b/94a3b8?text=Org";
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-100 text-sm">
                        {company.name}
                      </span>
                      {company.website && (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-blue-400 transition-colors"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 block line-clamp-1">
                      {company.description}
                    </span>
                  </div>
                </div>
                {getStatusBadge(company.status)}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-medium">
                  {company.industry}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {company.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Persons className="w-3 h-3 text-slate-500" />
                    {company.employees}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                {renderActionButtons(companyId, company.status)}
              </div>
            </div>
          );
        })}
      </div>

      {/* DESKTOP VIEW (Hero UI Table >= 640px) */}
      <div className="hidden sm:block">
        <Table className="min-w-full divide-y divide-slate-800">
          <Table.ScrollContainer>
            <Table.Content aria-label="Companies list table">
              <Table.Header className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                {/* isRowHeader added here */}
                <Table.Column isRowHeader className="py-3 px-4 text-left">
                  Company & Info
                </Table.Column>
                <Table.Column className="py-3 px-4 text-left">
                  Industry & Location
                </Table.Column>
                <Table.Column className="py-3 px-4 text-left">
                  Employees
                </Table.Column>
                <Table.Column className="py-3 px-4 text-left">
                  Status
                </Table.Column>
                <Table.Column className="py-3 px-4 text-right">
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body className="divide-y divide-slate-800/60 bg-slate-900">
                {companies.map((company) => {
                  const companyId = company._id?.$oid || company._id;

                  return (
                    <Table.Row
                      key={companyId}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Company Info */}
                      <Table.Cell className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={company.logoUrl}
                            alt={`${company.name} logo`}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-700 bg-slate-800"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/40/1e293b/94a3b8?text=Org";
                            }}
                          />
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-slate-100 text-sm">
                                {company.name}
                              </span>
                              {company.website && (
                                <a
                                  href={company.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-400 hover:text-blue-400 transition-colors"
                                >
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                            <span className="text-xs text-slate-400 line-clamp-1 max-w-xs">
                              {company.description}
                            </span>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* Industry & Location */}
                      <Table.Cell className="py-4 px-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded px-2 py-0.5 w-max">
                            {company.industry}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            {company.location}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Employee Count */}
                      <Table.Cell className="py-4 px-4">
                        <div className="text-xs text-slate-300 flex items-center gap-1.5">
                          <Persons className="w-3.5 h-3.5 text-slate-500" />
                          {company.employees}
                        </div>
                      </Table.Cell>

                      {/* Status Badge */}
                      <Table.Cell className="py-4 px-4">
                        {getStatusBadge(company.status)}
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end">
                          {renderActionButtons(companyId, company.status)}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>

          <Table.Footer className="px-4 py-3 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center">
            <span>Server Synced</span>
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-500" /> Global Admin Mode
            </div>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
}
