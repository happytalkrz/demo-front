import React from 'react';
import { FiUsers, FiMessageSquare, FiBarChart2, FiCalendar } from 'react-icons/fi';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">대시보드</h1>
      
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <FiUsers className="text-blue-500 text-xl" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm text-gray-500">사용자</h2>
              <p className="text-xl font-semibold">2,450</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <FiMessageSquare className="text-green-500 text-xl" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm text-gray-500">메시지</h2>
              <p className="text-xl font-semibold">14,235</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full">
              <FiBarChart2 className="text-yellow-500 text-xl" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm text-gray-500">매출</h2>
              <p className="text-xl font-semibold">₩45,600,000</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <FiCalendar className="text-purple-500 text-xl" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm text-gray-500">일정</h2>
              <p className="text-xl font-semibold">32</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 내용 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 최근 활동 */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">최근 활동</h2>
          <div className="space-y-4">
            <div className="border-b pb-3">
              <p className="font-medium">신규 사용자 등록</p>
              <p className="text-sm text-gray-500">홍길동님이 새로운 계정을 생성했습니다.</p>
              <p className="text-xs text-gray-400 mt-1">2시간 전</p>
            </div>
            <div className="border-b pb-3">
              <p className="font-medium">문서 업데이트</p>
              <p className="text-sm text-gray-500">프로젝트 문서가 업데이트 되었습니다.</p>
              <p className="text-xs text-gray-400 mt-1">4시간 전</p>
            </div>
            <div className="border-b pb-3">
              <p className="font-medium">시스템 알림</p>
              <p className="text-sm text-gray-500">서버 유지보수가 예정되어 있습니다.</p>
              <p className="text-xs text-gray-400 mt-1">어제</p>
            </div>
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