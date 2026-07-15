import React from "react";
// Correct Gravity UI Icon imports
import { FileText, Persons, Thunderbolt, CircleCheck } from "@gravity-ui/icons";
import StatCard from "./StatCard";



export const StatGrid = () => {
  const statsData = [
    {
      id: 1,
      title: "Total Job Posts",
      value: "48",
      icon: FileText,
    },
    {
      id: 2,
      title: "Total Applicants",
      value: "1,284",
      icon: Persons,
    },
    {
      id: 3,
      title: "Active Jobs",
      value: "18",
      icon: Thunderbolt,
    },
    {
      id: 4,
      title: "Jobs Closed",
      value: "32",
      icon: CircleCheck,
    },
  ];

  return (
    <div className="w-full bg-[#09090b] p-6 flex items-center justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default StatGrid;
