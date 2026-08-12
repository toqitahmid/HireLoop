import React from "react";
import StatCard from "@/components/recruiterDashboardComponent/StatCard";
import { FileText, Bulb, Thunderbolt, Clock } from "@gravity-ui/icons";

const AdminStatGrid = ({ stats }) => {
  const cards = [
    {
      id: 1,
      title: "Total Jobs",
      value: stats.totalJobs || 0,
      icon: FileText,
    },
    {
      id: 2,
      title: "Active Jobs",
      value: stats.activeJobs || 0,
      icon: Thunderbolt,
    },
    {
      id: 3,
      title: "Companies",
      value: stats.totalCompanies || 0,
      icon: Bulb,
    },
    {
      id: 4,
      title: "Pending Companies",
      value: stats.pendingCompanies || 0,
      icon: Clock,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatCard
          key={card.id}
          title={card.title}
          value={card.value}
          icon={card.icon}
        />
      ))}
    </div>
  );
};

export default AdminStatGrid;
