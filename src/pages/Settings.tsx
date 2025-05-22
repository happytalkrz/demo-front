import React, { useState } from 'react';
import { FiSave, FiLock, FiUsers, FiMonitor, FiBell } from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">설정</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* 탭 메뉴 */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow">
            <ul>
              <li>
                <button
                  className={`flex items-center w-full px-4 py-3 text-left ${
                    activeTab === 'general' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('general')}
                >
                  <FiMonitor className="mr-3" />
                  <span>일반 설정</span>
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full px-4 py-3 text-left ${
                    activeTab === 'security' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('security')}
                >
                  <FiLock className="mr-3" />
                  <span>보안</span>
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full px-4 py-3 text-left ${
                    activeTab === 'notifications' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <FiBell className="mr-3" />
                  <span>알림</span>
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full px-4 py-3 text-left ${
                    activeTab === 'permissions' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('permissions')}
                >
                  <FiUsers className="mr-3" />
                  <span>권한 관리</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* 설정 내용 */}
        <div className="md:w-3/4">
          <div className="bg-white rounded-lg shadow p-6">
            {activeTab === 'general' && (
              <div>
                <h2 className="text-lg font-semibold mb-6">일반 설정</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      시스템 이름
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="관리 시스템"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      언어 설정
                    </label>
                    <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="ko">한국어</option>
                      <option value="en">English</option>
                      <option value="ja">日本語</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      시간대
                    </label>
                    <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="Asia/Seoul">(GMT+09:00) 서울</option>
                      <option value="Asia/Tokyo">(GMT+09:00) 도쿄</option>
                      <option value="America/New_York">(GMT-05:00) 뉴욕</option>
                      <option value="Europe/London">(GMT+00:00) 런던</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      기본 테마
                    </label>
                    <div className="flex gap-4">
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="theme" 
                          value="light" 
                          defaultChecked 
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2">라이트 모드</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="theme" 
                          value="dark"
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2">다크 모드</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="theme" 
                          value="system"
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2">시스템 기본값</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-semibold mb-6">보안 설정</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      세션 타임아웃 (분)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="30"
                      min="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      비밀번호 정책
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          defaultChecked
                          className="text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-2 text-sm">최소 8자리 이상</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          defaultChecked
                          className="text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-2 text-sm">대문자 포함</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          defaultChecked
                          className="text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-2 text-sm">특수문자 포함</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          defaultChecked
                          className="text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-2 text-sm">90일마다 변경 요구</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      2단계 인증
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2">2단계 인증 활성화</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-semibold mb-6">알림 설정</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      이메일 알림
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          defaultChecked
                          className="text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-2 text-sm">보안 알림</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          defaultChecked
                          className="text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-2 text-sm">시스템 업데이트</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          defaultChecked
                          className="text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-2 text-sm">주간 리포트</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      브라우저 알림
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          defaultChecked
                          className="text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-2 text-sm">새 메시지</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          defaultChecked
                          className="text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-2 text-sm">이벤트 알림</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'permissions' && (
              <div>
                <h2 className="text-lg font-semibold mb-6">권한 관리</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      역할별 권한
                    </label>
                    <div className="space-y-4">
                      <div className="border p-4 rounded-md">
                        <h3 className="font-medium mb-2">관리자</h3>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input 
                              type="checkbox"
                              defaultChecked
                              className="text-blue-600 focus:ring-blue-500 rounded"
                            />
                            <span className="ml-2 text-sm">모든 시스템 접근</span>
                          </label>
                          <label className="flex items-center">
                            <input 
                              type="checkbox"
                              defaultChecked
                              className="text-blue-600 focus:ring-blue-500 rounded"
                            />
                            <span className="ml-2 text-sm">사용자 관리</span>
                          </label>
                          <label className="flex items-center">
                            <input 
                              type="checkbox"
                              defaultChecked
                              className="text-blue-600 focus:ring-blue-500 rounded"
                            />
                            <span className="ml-2 text-sm">설정 변경</span>
                          </label>
                        </div>
                      </div>
                      <div className="border p-4 rounded-md">
                        <h3 className="font-medium mb-2">편집자</h3>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input 
                              type="checkbox"
                              defaultChecked
                              className="text-blue-600 focus:ring-blue-500 rounded"
                            />
                            <span className="ml-2 text-sm">콘텐츠 생성</span>
                          </label>
                          <label className="flex items-center">
                            <input 
                              type="checkbox"
                              defaultChecked
                              className="text-blue-600 focus:ring-blue-500 rounded"
                            />
                            <span className="ml-2 text-sm">콘텐츠 수정</span>
                          </label>
                          <label className="flex items-center">
                            <input 
                              type="checkbox"
                              className="text-blue-600 focus:ring-blue-500 rounded"
                            />
                            <span className="ml-2 text-sm">콘텐츠 삭제</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <button 
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition mr-2"
              >
                취소
              </button>
              <button 
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center"
              >
                <FiSave className="mr-2" /> 저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 