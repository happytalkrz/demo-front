import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import { statCardsData, recentActivities } from '../data/dashboardData';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">대시보드</h1>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCardsData.map((cardData, index) => (
          <StatCard key={index} data={cardData} />
        ))}
      </div>

      {/* 차트 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">사용자 활동 추이</h2>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-400">차트 영역 (구현 예정)</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">월별 성장률</h2>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-400">차트 영역 (구현 예정)</p>
          </div>
        </div>
      </div>

      {/* 내용 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 최근 활동 */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">최근 활동</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={activity.id}
                className={`${index < recentActivities.length - 1 ? 'border-b' : ''} pb-3`}
              >
                <p className="font-medium">{activity.type}</p>
                <p className="text-sm text-gray-500">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* 빠른 액세스 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">빠른 액세스</h2>
          <div className="space-y-3">
            <button className="w-full py-2 px-4 bg-gray-100 text-left rounded hover:bg-gray-200 transition">
              사용자 관리
            </button>
            <button className="w-full py-2 px-4 bg-gray-100 text-left rounded hover:bg-gray-200 transition">
              보고서 생성
            </button>
            <button className="w-full py-2 px-4 bg-gray-100 text-left rounded hover:bg-gray-200 transition">
              설정
            </button>
            <button className="w-full py-2 px-4 bg-gray-100 text-left rounded hover:bg-gray-200 transition">
              도움말
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 