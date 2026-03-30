import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import { statCardsData, recentActivities } from '../data/dashboardData';
import { useToast } from '../hooks/useToast';

const Dashboard = () => {
  const toast = useToast();

  const handleSuccessToast = () => {
    toast.success('성공!', '작업이 성공적으로 완료되었습니다.');
  };

  const handleErrorToast = () => {
    toast.error('오류 발생', '요청을 처리하는 중 문제가 발생했습니다.');
  };

  const handleWarningToast = () => {
    toast.warning('주의', '이 작업은 되돌릴 수 없습니다.');
  };

  const handleInfoToast = () => {
    toast.info('정보', '새로운 업데이트가 있습니다.');
  };

  const handleMultipleToasts = () => {
    toast.success('첫 번째 성공');
    setTimeout(() => toast.error('두 번째 오류'), 500);
    setTimeout(() => toast.warning('세 번째 경고'), 1000);
    setTimeout(() => toast.info('네 번째 정보'), 1500);
  };

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

        {/* Toast 시스템 테스트 */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Toast 알림 테스트</h2>
          <div className="space-y-3">
            <button
              onClick={handleSuccessToast}
              className="w-full py-3 px-4 bg-green-100 text-left rounded hover:bg-green-200 transition text-sm sm:text-base text-green-800"
            >
              ✅ 성공 Toast
            </button>
            <button
              onClick={handleErrorToast}
              className="w-full py-3 px-4 bg-red-100 text-left rounded hover:bg-red-200 transition text-sm sm:text-base text-red-800"
            >
              ❌ 오류 Toast
            </button>
            <button
              onClick={handleWarningToast}
              className="w-full py-3 px-4 bg-yellow-100 text-left rounded hover:bg-yellow-200 transition text-sm sm:text-base text-yellow-800"
            >
              ⚠️ 경고 Toast
            </button>
            <button
              onClick={handleInfoToast}
              className="w-full py-3 px-4 bg-blue-100 text-left rounded hover:bg-blue-200 transition text-sm sm:text-base text-blue-800"
            >
              ℹ️ 정보 Toast
            </button>
            <button
              onClick={handleMultipleToasts}
              className="w-full py-3 px-4 bg-purple-100 text-left rounded hover:bg-purple-200 transition text-sm sm:text-base text-purple-800"
            >
              🚀 스택 테스트 (다중)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 