import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import { statCardsData, recentActivities } from '../data/dashboardData';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">대시보드</h1>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {statCardsData.map((cardData, index) => (
          <StatCard key={index} data={cardData} />
        ))}
      </div>

      {/* 차트 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">사용자 활동 추이</h2>
          <div className="h-48 sm:h-64 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-400 text-sm sm:text-base">차트 영역 (구현 예정)</p>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">월별 성장률</h2>
          <div className="h-48 sm:h-64 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-400 text-sm sm:text-base">차트 영역 (구현 예정)</p>
          </div>
        </div>
      </div>

      {/* 내용 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* 최근 활동 */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow lg:col-span-2">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">최근 활동</h2>
          <div className="space-y-3 sm:space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={activity.id}
                className={`${index < recentActivities.length - 1 ? 'border-b' : ''} pb-3`}
              >
                <p className="font-medium text-sm sm:text-base">{activity.type}</p>
                <p className="text-xs sm:text-sm text-gray-500">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 빠른 액세스 */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">빠른 액세스</h2>
          <div className="space-y-3">
            <button className="w-full py-3 px-4 bg-gray-100 text-left rounded hover:bg-gray-200 transition text-sm sm:text-base">
              사용자 관리
            </button>
            <button className="w-full py-3 px-4 bg-gray-100 text-left rounded hover:bg-gray-200 transition text-sm sm:text-base">
              보고서 생성
            </button>
            <button className="w-full py-3 px-4 bg-gray-100 text-left rounded hover:bg-gray-200 transition text-sm sm:text-base">
              설정
            </button>
            <button className="w-full py-3 px-4 bg-gray-100 text-left rounded hover:bg-gray-200 transition text-sm sm:text-base">
              도움말
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 