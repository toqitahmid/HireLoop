import React from "react";
import StatCard from "@/components/recruiterDashboardComponent/StatCard";
import { FileText, Persons, Thunderbolt, CircleCheck } from "@gravity-ui/icons";

const SeekerStatGrid = ({ stats }) => {
  const { total = 0, active = 0, interviews = 0, saved = 0 } = stats || {};

  const statsData = [
    {
      id: 1,
      title: "Total Applications",
      value: String(total),
      icon: FileText,
    },
    {
      id: 2,
      title: "Active Applications",
      value: String(active),
      icon: Persons,
    },
    {
      id: 3,
      title: "Interviews Scheduled",
      value: String(interviews),
      icon: Thunderbolt,
    },
    { id: 4, title: "Saved Jobs", value: String(saved), icon: CircleCheck },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {statsData.map((s) => (
        <StatCard key={s.id} title={s.title} value={s.value} icon={s.icon} />
      ))}
    </div>
  );
};

export default SeekerStatGrid;
