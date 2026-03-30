import React from 'react';
import { StatCardData } from '../../types/common';

interface StatCardProps {
  data: StatCardData;
}

const StatCard = ({ data }: StatCardProps) => {
  const { icon: Icon, title, value, bgColor, iconColor } = data;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-md transition-shadow min-h-[100px] flex items-center">
      <div className="flex items-center w-full">
        <div className={`${bgColor} p-2 sm:p-3 rounded-full flex-shrink-0`}>
          <Icon className={`${iconColor} text-lg sm:text-xl`} />
        </div>
        <div className="ml-3 sm:ml-4 min-w-0 flex-1">
          <h2 className="text-xs sm:text-sm text-gray-500 truncate">{title}</h2>
          <p className="text-lg sm:text-xl font-semibold truncate">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;