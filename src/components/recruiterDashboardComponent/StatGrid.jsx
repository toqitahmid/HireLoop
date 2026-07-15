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
    <div className="flex items-center justify-center">
      <div className="lg:min-w-[78vw] md:min-w-[68vw] min-w-[85vw] flex items-center justify-center bg-[#121213] p-3 rounded-2xl">
        <div className="w-full lg:max-w-4xl grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-2">
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
    </div>
  );
};

export default StatGrid;
