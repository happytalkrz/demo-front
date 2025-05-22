import React, { useState, ChangeEvent } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiX } from 'react-icons/fi';

const AIPermissions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  
  // 테이블 데이터
  const tableData = [
    { id: 1, type: '상담사', name: '김철수', userId: 'kim123', userNumber: '12345', access: true, record: true, accessAdv: true, summary: true, summaryAfter: true },
    { id: 2, type: '상담사', name: '이영희', userId: 'lee45', userNumber: '23456', access: true, record: true, accessAdv: true, summary: true, summaryAfter: true },
    { id: 3, type: '관리자', name: '박민수', userId: 'park78', userNumber: '34567', access: true, record: true, accessAdv: true, summary: true, summaryAfter: true },
    { id: 4, type: '상담사', name: '정수진', userId: 'jung22', userNumber: '45678', access: true, record: true, accessAdv: true, summary: true, summaryAfter: true },
    { id: 5, type: '관리자', name: '홍길동', userId: 'hong100', userNumber: '56789', access: true, record: true, accessAdv: true, summary: true, summaryAfter: true },
  ];

  // 페이지 배열 생성
  const pages = [1, 2, 3, 4, 5];

  // 변경 이력 데이터
  const historyData = [
    { id: 1, date: '2023-04-28 14:30:22', operator: '김관리(admin01)', target: '김철수(kim123)', changes: '권한 : Off → On\n권한 상승 : On → Off\nAI 상담 종료 요약 : Off → On' },
    { id: 2, date: '2023-04-27 11:15:43', operator: '이매니저(manager11)', target: '이영희(lee45)', changes: '권한 상승 : On → Off' },
    { id: 3, date: '2023-04-25 09:22:15', operator: '김관리(admin01)', target: '박민수(park78)', changes: 'AI 상담 중 요약 : Off → On' },
    { id: 4, date: '2023-04-25 09:22:15', operator: '김관리(admin01)', target: '박민수(park78)', changes: 'AI 상담 중 요약 : Off → On' },
    { id: 5, date: '2023-04-25 09:22:15', operator: '김관리(admin01)', target: '박민수(park78)', changes: 'AI 상담 중 요약 : Off → On' },
    { id: 6, date: '2023-04-25 09:22:15', operator: '김관리(admin01)', target: '박민수(park78)', changes: 'AI 상담 중 요약 : Off → On' },
    { id: 7, date: '2023-04-25 09:22:15', operator: '김관리(admin01)', target: '박민수(park78)', changes: 'AI 상담 중 요약 : Off → On' },
    { id: 8, date: '2023-04-25 09:22:15', operator: '김관리(admin01)', target: '박민수(park78)', changes: 'AI 상담 중 요약 : Off → On' },
    { id: 9, date: '2023-04-25 09:22:15', operator: '김관리(admin01)', target: '박민수(park78)', changes: 'AI 상담 중 요약 : Off → On' },
  ];

  // 전체 체크박스 상태
  const [allChecked, setAllChecked] = useState(false);
  const [allAccessChecked, setAllAccessChecked] = useState(false);
  const [allRecordChecked, setAllRecordChecked] = useState(false);
  const [allAccessAdvChecked, setAllAccessAdvChecked] = useState(false);
  const [allSummaryChecked, setAllSummaryChecked] = useState(false);
  const [allSummaryAfterChecked, setAllSummaryAfterChecked] = useState(false);

  // 전체 체크박스 핸들러
  const handleAllChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setAllChecked(e.target.checked);
    // 실제 구현에서는 모든 행의 체크박스 상태를 변경
  };

  const handleAllAccessChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setAllAccessChecked(e.target.checked);
    // 실제 구현에서는 모든 행의 'access' 체크박스 상태를 변경
  };

  const handleAllRecordChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setAllRecordChecked(e.target.checked);
    // 실제 구현에서는 모든 행의 'record' 체크박스 상태를 변경
  };

  const handleAllAccessAdvChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setAllAccessAdvChecked(e.target.checked);
    // 실제 구현에서는 모든 행의 'accessAdv' 체크박스 상태를 변경
  };

  const handleAllSummaryChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setAllSummaryChecked(e.target.checked);
    // 실제 구현에서는 모든 행의 'summary' 체크박스 상태를 변경
  };

  const handleAllSummaryAfterChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setAllSummaryAfterChecked(e.target.checked);
    // 실제 구현에서는 모든 행의 'summaryAfter' 체크박스 상태를 변경
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-semibold mb-6">AI 권한 관리</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
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
            
            <button 
              className="flex items-center justify-center h-10 ml-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              onClick={() => setShowHistoryModal(true)}
            >
              변경 이력 조회
            </button>
            
            <button className="flex items-center justify-center h-10 ml-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600">
              저장
            </button>
          </div>
          
          {/* 테이블 */}
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    <input 
                      type="checkbox" 
                      checked={allChecked}
                      onChange={handleAllChecked}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                    />
                  </th>
                  <th scope="col" className="px-4 py-3">구분</th>
                  <th scope="col" className="px-4 py-3">상담사명</th>
                  <th scope="col" className="px-4 py-3">아이디</th>
                  <th scope="col" className="px-4 py-3">상담사 번호</th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={allAccessChecked}
                        onChange={handleAllAccessChecked}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2" 
                      />
                      권한 상승
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={allRecordChecked}
                        onChange={handleAllRecordChecked}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2" 
                      />
                      채팅
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={allAccessAdvChecked}
                        onChange={handleAllAccessAdvChecked}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2" 
                      />
                      권한 하락 보기
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={allSummaryChecked}
                        onChange={handleAllSummaryChecked}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2" 
                      />
                      AI 상담 중 요약
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={allSummaryAfterChecked}
                        onChange={handleAllSummaryAfterChecked}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2" 
                      />
                      AI 상담 종료 요약
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    </td>
                    <td className="px-4 py-4">{row.type}</td>
                    <td className="px-4 py-4">{row.name}</td>
                    <td className="px-4 py-4">{row.userId}</td>
                    <td className="px-4 py-4">{row.userNumber}</td>
                    <td className="px-4 py-4">
                      <input 
                        type="checkbox" 
                        checked={row.access} 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                      />
                    </td>
                    <td className="px-4 py-4">
                      <input 
                        type="checkbox" 
                        checked={row.record} 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                      />
                    </td>
                    <td className="px-4 py-4">
                      <input 
                        type="checkbox" 
                        checked={row.accessAdv} 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                      />
                    </td>
                    <td className="px-4 py-4">
                      <input 
                        type="checkbox" 
                        checked={row.summary} 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                      />
                    </td>
                    <td className="px-4 py-4">
                      <input 
                        type="checkbox" 
                        checked={row.summaryAfter} 
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

      {/* 변경 이력 조회 모달 */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-4xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">권한 변경 이력</h2>
              <button 
                onClick={() => setShowHistoryModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto flex-grow">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3">변경 일시</th>
                    <th scope="col" className="px-6 py-3">변경자</th>
                    <th scope="col" className="px-6 py-3">변경 대상</th>
                    <th scope="col" className="px-6 py-3">변경 내용</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.map((item) => (
                    <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">{item.operator}</td>
                      <td className="px-6 py-4">{item.target}</td>
                      <td className="px-6 py-4 whitespace-pre-line">{item.changes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPermissions; 