import React, { useState } from 'react';
import { FiSearch, FiDownload, FiFilter } from 'react-icons/fi';

const DataTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // 더미 데이터
  const data = [
    { id: '001', category: '전자제품', name: '스마트폰', price: 1200000, stock: 45, sales: 120 },
    { id: '002', category: '전자제품', name: '노트북', price: 1800000, stock: 23, sales: 55 },
    { id: '003', category: '전자제품', name: '태블릿', price: 800000, stock: 30, sales: 75 },
    { id: '004', category: '의류', name: '티셔츠', price: 30000, stock: 150, sales: 320 },
    { id: '005', category: '의류', name: '청바지', price: 50000, stock: 85, sales: 220 },
    { id: '006', category: '가전', name: '냉장고', price: 1500000, stock: 12, sales: 28 },
    { id: '007', category: '가전', name: '세탁기', price: 900000, stock: 18, sales: 35 },
    { id: '008', category: '가구', name: '침대', price: 500000, stock: 15, sales: 22 },
    { id: '009', category: '가구', name: '책상', price: 250000, stock: 25, sales: 45 },
    { id: '010', category: '도서', name: '소설책', price: 15000, stock: 200, sales: 380 },
  ];

  // 카테고리 필터 옵션
  const categories = [...new Set(data.map(item => item.category))];

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">데이터 테이블</h1>
      
      {/* 검색 및 필터링 도구 */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="md:w-1/4">
          <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">모든 카테고리</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="md:w-1/4">
          <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">정렬 기준</option>
            <option value="name">이름순</option>
            <option value="price_asc">가격 낮은순</option>
            <option value="price_desc">가격 높은순</option>
            <option value="sales">판매량순</option>
          </select>
        </div>
        <div className="md:w-2/4 relative">
          <input
            type="text"
            placeholder="상품명 검색"
            className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* 테이블 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-700">
          총 <span className="font-medium">{data.length}</span>개의 상품
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition flex items-center text-sm">
            <FiFilter className="mr-2" /> 필터
          </button>
          <button className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition flex items-center text-sm">
            <FiDownload className="mr-2" /> 내보내기
          </button>
        </div>
      </div>

      {/* 데이터 테이블 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  카테고리
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상품명
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  가격
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  재고
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  판매량
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatPrice(item.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.stock}개
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.sales}개
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-6">
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
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            2
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            3
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

export default DataTable; 