import React, { useState } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

const AISummary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState(1);
  
  // 토글 상태
  const [enableSummary, setEnableSummary] = useState(true);
  const [usageRestriction, setUsageRestriction] = useState(true);
  const [externalUsageRestriction, setExternalUsageRestriction] = useState(true);
  
  // 테이블 데이터
  const tableData = [
    { id: 1, type: '상담사', name: '김철수', userId: 'kim123', userNumber: '12345', allowSummary: true, allowUsage: true },
    { id: 2, type: '상담사', name: '이영희', userId: 'lee45', userNumber: '23456', allowSummary: true, allowUsage: true },
    { id: 3, type: '관리자', name: '박민수', userId: 'park78', userNumber: '34567', allowSummary: false, allowUsage: false },
    { id: 4, type: '상담사', name: '정수진', userId: 'jung22', userNumber: '45678', allowSummary: true, allowUsage: false },
    { id: 5, type: '관리자', name: '홍길동', userId: 'hong100', userNumber: '56789', allowSummary: false, allowUsage: false },
  ];

  // 페이지 배열 생성
  const pages = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-semibold mb-6">AI 상담 요약 관리</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {/* 기능 활성화 설정 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">기능 활성화 설정</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
              <span className="text-sm font-medium">상담 요약 기능 활성화</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={enableSummary} 
                  onChange={() => setEnableSummary(!enableSummary)} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
              <span className="text-sm font-medium">상담 중 요약 사용</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={usageRestriction} 
                  onChange={() => setUsageRestriction(!usageRestriction)} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
              <span className="text-sm font-medium">상담 종료 후 요약 사용</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={externalUsageRestriction} 
                  onChange={() => setExternalUsageRestriction(!externalUsageRestriction)} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* 사용자별 권한 설정 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">사용자별 권한 설정</h2>
          
          <div className="flex items-center mb-4">
            <div className="flex mr-4">
              <button className="flex items-center justify-center h-10 px-4 border border-gray-300 bg-white text-gray-700 rounded-l-md hover:bg-gray-50 focus:outline-none">
                전체
              </button>
              <button className="flex items-center justify-center h-10 px-4 border border-gray-300 bg-white text-gray-700 border-l-0 rounded-r-md hover:bg-gray-50 focus:outline-none">
                <span className="sr-only">삭제</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="상담사명/아이디 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
            </div>
            
            <button className="flex items-center justify-center h-10 ml-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600">
              저장
            </button>
          </div>
          
          {/* 테이블 */}
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  </th>
                  <th scope="col" className="px-6 py-3">구분</th>
                  <th scope="col" className="px-6 py-3">상담사명</th>
                  <th scope="col" className="px-6 py-3">아이디</th>
                  <th scope="col" className="px-6 py-3">상담사 번호</th>
                  <th scope="col" className="px-6 py-3">AI 상담 중 요약</th>
                  <th scope="col" className="px-6 py-3">AI 상담 종료 요약</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    </td>
                    <td className="px-6 py-4">{row.type}</td>
                    <td className="px-6 py-4">{row.name}</td>
                    <td className="px-6 py-4">{row.userId}</td>
                    <td className="px-6 py-4">{row.userNumber}</td>
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox" 
                        checked={row.allowSummary} 
                        readOnly 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox" 
                        checked={row.allowUsage} 
                        readOnly 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* 페이지네이션 */}
          <div className="flex items-center justify-center mt-6">
            <button className="px-2 py-1 mx-1 rounded-md">
              <FiChevronsLeft />
            </button>
            <button className="px-2 py-1 mx-1 rounded-md">
              <FiChevronLeft />
            </button>
            
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`px-3 py-1 mx-1 rounded-md ${
                  activePage === page
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button className="px-2 py-1 mx-1 rounded-md">
              <FiChevronRight />
            </button>
            <button className="px-2 py-1 mx-1 rounded-md">
              <FiChevronsRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISummary; 