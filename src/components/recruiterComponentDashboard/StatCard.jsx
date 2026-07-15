import React from "react";
// Only import Card from the package root in v3
import { Card } from "@heroui/react";

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <Card
      // isHoverable is removed in v3. Use Tailwind hover states instead.
      className="bg-[#18181b] border border-[#27272a] shadow-sm rounded-xl p-2 transition-all duration-200 hover:border-neutral-700"
    >
      {/* v3 uses Card.Content instead of CardBody */}
      <Card.Content className="flex flex-col gap-5 justify-between min-h-[120px]">
        {/* Icon Wrapper */}
        <div className="w-10 h-10 flex items-center justify-center bg-[#27272a] rounded-xl text-neutral-400">
          {Icon && <Icon className="w-5 h-5" />}
        </div>

        {/* Text Contents */}
        <div className="space-y-1">
          <p className="text-sm text-center font-medium text-neutral-400">{title}</p>
          <h3 className="text-2xl text-center font-semibold text-white tracking-tight">
            {value}
          </h3>
        </div>
      </Card.Content>
    </Card>
  );
};

export default StatCard;
