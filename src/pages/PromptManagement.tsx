import React, { useState } from 'react';
import { FiEdit2, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const PromptManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();
  
  // 프롬프트 데이터
  const promptData = [
    { id: 1, name: '상담 중 요약', lastModified: '-', modifiedBy: '-', status: '기본 프롬프트 사용 중' },
    { id: 2, name: '상담 종료 요약', lastModified: '2025.04.22 09:15', modifiedBy: '박관리', status: '커스텀 프롬프트 사용 중' },
  ];

  // 페이지 배열 생성
  const pages = [1, 2, 3, 4, 5];

  // 프롬프트 편집 페이지로 이동
  const handleEditPrompt = (promptName: string) => {
    navigate('/prompts', { state: { promptName } });
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-semibold mb-4">프롬프트 관리</h1>
      
      <p className="text-sm text-gray-600 mb-6">
        에티토스 AI 기능별 프롬프트 설정 화면을 확인하고 수정할 수 있습니다. 별도로 설정하지 않은 경우, 시스템 기본 프롬프트가 자동으로 적용됩니다.
      </p>
      
      <div className="bg-white rounded-lg border">
        {/* 검색 영역 */}
        <div className="p-4 flex space-x-4">
          <button className="flex items-center justify-center h-10 px-4 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none">
            전체
          </button>
          
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="상담사명/아이디 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* 테이블 */}
        <div className="w-full">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 w-1/4">기능명</th>
                  <th scope="col" className="px-6 py-3 w-1/4">최근 수정일</th>
                  <th scope="col" className="px-6 py-3 w-1/4">수정자</th>
                  <th scope="col" className="px-6 py-3 w-1/4">상태</th>
                </tr>
              </thead>
              <tbody>
                {promptData.map((prompt) => (
                  <tr key={prompt.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{prompt.name}</td>
                    <td className="px-6 py-4">{prompt.lastModified}</td>
                    <td className="px-6 py-4">{prompt.modifiedBy}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">{prompt.status}</span>
                        <button 
                          onClick={() => handleEditPrompt(prompt.name)}
                          className="text-gray-500 hover:text-blue-600"
                        >
                          <FiEdit2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 페이지네이션 */}
        <div className="flex items-center justify-center p-4">
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

      {/* 프롬프트 관리 정책 */}
      <div className="bg-gray-100 rounded-lg p-4 mt-6">
        <h2 className="text-md font-semibold mb-2">프롬프트 관리 정책</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          <li>커스텀 프롬프트를 설정하지 않은 기능은 시스템 기본 프롬프트를 사용합니다.</li>
          <li>프롬프트를 수정하여 저장한 경우, 해당 기능은 커스텀 프롬프트를 사용합니다.</li>
          <li>초기화 기능을 통해 언제든 기본 프롬프트로 복구할 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
};

export default PromptManagement; 