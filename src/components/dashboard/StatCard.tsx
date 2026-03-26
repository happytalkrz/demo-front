import React from 'react';
import { StatCardData } from '../../types/common';

interface StatCardProps {
  data: StatCardData;
}

const StatCard = ({ data }: StatCardProps) => {
  const { icon: Icon, title, value, bgColor, iconColor } = data;

  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className={`${bgColor} p-3 rounded-full`}>
          <Icon className={`${iconColor} text-xl`} />
        </div>
        <div className="ml-4">
          <h2 className="text-sm text-gray-500">{title}</h2>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;