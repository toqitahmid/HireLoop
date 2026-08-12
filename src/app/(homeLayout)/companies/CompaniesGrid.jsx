"use client";

import { useMemo, useState } from "react";
import {
  Card,
  Avatar,
  Chip,
  Input,
  Select,
  ListBox,
  Link,
} from "@heroui/react";
import {
  MapPin,
  Users,
  Search,
  ExternalLink,
  Building2,
  ChevronDown,
} from "lucide-react";

const STATUS_COLOR = {
  Approved: "success",
  Pending: "warning",
  Rejected: "danger",
};

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function CompaniesGrid({ companies }) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("all");
  const [status, setStatus] = useState("all");

  const industries = useMemo(
    () => Array.from(new Set(companies.map((c) => c.industry))).sort(),
    [companies],
  );

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const matchesQuery =
        query.trim().length === 0 ||
        c.name.toLowerCase().includes(query.trim().toLowerCase());
      const matchesIndustry = industry === "all" || c.industry === industry;
      const matchesStatus = status === "all" || c.status === status;
      return matchesQuery && matchesIndustry && matchesStatus;
    });
  }, [companies, query, industry, status]);

  return (
    <div className="flex flex-col gap-6">
      {/* Filter bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-teal-900/10 bg-white/60 p-4 backdrop-blur-sm sm:flex-row sm:items-center dark:bg-white/5">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-900/40" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search companies by name"
            className="w-full pl-9"
          />
        </div>

        <Select
          value={industry}
          onChange={setIndustry}
          aria-label="Filter by industry"
          className="w-full sm:max-w-[200px]"
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator>
              <ChevronDown className="h-4 w-4" />
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="all" textValue="All industries">
                All industries
                <ListBox.ItemIndicator />
              </ListBox.Item>
              {industries.map((ind) => (
                <ListBox.Item key={ind} id={ind} textValue={ind}>
                  {ind}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <Select
          value={status}
          onChange={setStatus}
          aria-label="Filter by status"
          className="w-full sm:max-w-[180px]"
        >
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator>
              <ChevronDown className="h-4 w-4" />
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="all" textValue="All statuses">
                All statuses
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="Approved" textValue="Approved">
                Approved
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="Pending" textValue="Pending">
                Pending
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="Rejected" textValue="Rejected">
                Rejected
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        <span className="text-sm text-teal-900/50 sm:ml-auto dark:text-white/50">
          {filtered.length} of {companies.length} companies
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((company) => (
            <CompanyCard key={company._id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}

function CompanyCard({ company }) {
  return (
    <Card className="group rounded-lg border border-teal-900/10 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-900">
      <Card.Content className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12 shrink-0 rounded-md border border-teal-900/10">
            <Avatar.Image src={company.logoUrl} alt={company.name} />
            <Avatar.Fallback>{getInitials(company.name)}</Avatar.Fallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-teal-950 dark:text-white">
              {company.name}
            </h3>
            <Chip
              variant="tertiary"
              className="mt-1 bg-teal-900/5 text-teal-900 dark:bg-white/10 dark:text-white"
            >
              <Building2 className="h-3 w-3" />
              {company.industry}
            </Chip>
          </div>
          <Chip color={STATUS_COLOR[company.status]} variant="soft">
            {company.status}
          </Chip>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-teal-950/70 dark:text-white/70">
          {company.description}
        </p>

        <div className="flex flex-col gap-1.5 text-sm text-teal-950/60 dark:text-white/60">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-amber-600" />
            <span className="truncate">{company.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 shrink-0 text-amber-600" />
            <span className="truncate">{company.employees}</span>
          </div>
        </div>
      </Card.Content>

      <Card.Footer className="border-t border-teal-900/10 pt-3 dark:border-white/10">
        <Link
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium text-teal-900 hover:bg-teal-900/5 dark:text-white dark:hover:bg-white/10"
        >
          Visit website
          <Link.Icon>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link.Icon>
        </Link>
      </Card.Footer>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-teal-900/15 py-16 text-center dark:border-white/15">
      <Building2 className="h-8 w-8 text-teal-900/30 dark:text-white/30" />
      <p className="text-sm font-medium text-teal-950/70 dark:text-white/70">
        No companies match your filters
      </p>
      <p className="text-xs text-teal-950/40 dark:text-white/40">
        Try a different search term or clear a filter
      </p>
    </div>
  );
}
