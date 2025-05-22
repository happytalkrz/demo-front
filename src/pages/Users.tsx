import React, { useState } from 'react';
import { FiSearch, FiEdit, FiTrash2, FiPlus, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Users = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<string>('name');
  
  // 더미 사용자 데이터
  const users = [
    { id: 1, name: '김영희', email: 'kim@example.com', role: '관리자', status: '활성', lastLogin: '2023-10-15 08:45' },
    { id: 2, name: '이철수', email: 'lee@example.com', role: '일반 사용자', status: '활성', lastLogin: '2023-10-14 14:20' },
    { id: 3, name: '박지민', email: 'park@example.com', role: '일반 사용자', status: '휴면', lastLogin: '2023-09-30 10:15' },
    { id: 4, name: '최동민', email: 'choi@example.com', role: '편집자', status: '활성', lastLogin: '2023-10-15 09:30' },
    { id: 5, name: '정수연', email: 'jung@example.com', role: '일반 사용자', status: '활성', lastLogin: '2023-10-12 16:45' },
    { id: 6, name: '강민준', email: 'kang@example.com', role: '일반 사용자', status: '비활성', lastLogin: '2023-08-25 11:20' },
    { id: 7, name: '윤서연', email: 'yoon@example.com', role: '편집자', status: '활성', lastLogin: '2023-10-14 13:10' },
  ];

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const renderSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ? <FiChevronUp className="inline ml-1" /> : <FiChevronDown className="inline ml-1" />;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">사용자 관리</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center">
          <FiPlus className="mr-2" /> 사용자 추가
        </button>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="md:w-1/4">
          <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">모든 역할</option>
            <option value="admin">관리자</option>
            <option value="editor">편집자</option>
            <option value="user">일반 사용자</option>
          </select>
        </div>
        <div className="md:w-1/4">
          <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">모든 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
            <option value="dormant">휴면</option>
          </select>
        </div>
        <div className="md:w-2/4 relative">
          <input
            type="text"
            placeholder="이름 또는 이메일로 검색"
            className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* 사용자 목록 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center font-medium uppercase tracking-wider"
                  onClick={() => handleSort('id')}
                >
                  ID {renderSortIcon('id')}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center font-medium uppercase tracking-wider"
                  onClick={() => handleSort('name')}
                >
                  이름 {renderSortIcon('name')}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center font-medium uppercase tracking-wider"
                  onClick={() => handleSort('email')}
                >
                  이메일 {renderSortIcon('email')}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center font-medium uppercase tracking-wider"
                  onClick={() => handleSort('role')}
                >
                  역할 {renderSortIcon('role')}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center font-medium uppercase tracking-wider"
                  onClick={() => handleSort('status')}
                >
                  상태 {renderSortIcon('status')}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center font-medium uppercase tracking-wider"
                  onClick={() => handleSort('lastLogin')}
                >
                  마지막 로그인 {renderSortIcon('lastLogin')}
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.role === '관리자' ? 'bg-purple-100 text-purple-800' : 
                    user.role === '편집자' ? 'bg-blue-100 text-blue-800' : 
                    'bg-green-100 text-green-800'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.status === '활성' ? 'bg-green-100 text-green-800' : 
                    user.status === '비활성' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastLogin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-600 hover:text-gray-900 mr-3">
                    <FiEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-700">
          총 <span className="font-medium">7</span>명의 사용자
        </div>
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <a
            href="#"
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            이전
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100"
          >
            1
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            다음
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Users; 