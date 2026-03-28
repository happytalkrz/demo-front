import React, { useState } from 'react';
import { FiSave, FiLock, FiUsers, FiMonitor, FiBell, FiUser } from 'react-icons/fi';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import Toggle from '../components/form/Toggle';
import { SelectOption } from '../types/common';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // 일반 설정 state
  const [systemName, setSystemName] = useState('관리 시스템');
  const [language, setLanguage] = useState('ko');
  const [timezone, setTimezone] = useState('Asia/Seoul');
  const [theme, setTheme] = useState('light');

  // 알림 설정 state
  const [emailNotifications, setEmailNotifications] = useState({
    security: true,
    systemUpdate: true,
    weeklyReport: true,
  });
  const [browserNotifications, setBrowserNotifications] = useState({
    newMessage: true,
    eventAlert: true,
  });

  // 보안 설정 state
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: true,
    uppercase: true,
    specialChar: true,
    periodicChange: true,
  });
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  // 비밀번호 변경 state
  const [passwordChange, setPasswordChange] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  // Select options
  const languageOptions: SelectOption[] = [
    { value: 'ko', label: '한국어' },
    { value: 'en', label: 'English' },
    { value: 'ja', label: '日本語' },
    { value: 'zh', label: '中文' },
  ];

  const timezoneOptions: SelectOption[] = [
    { value: 'Asia/Seoul', label: '(GMT+09:00) 서울' },
    { value: 'Asia/Tokyo', label: '(GMT+09:00) 도쿄' },
    { value: 'America/New_York', label: '(GMT-05:00) 뉴욕' },
    { value: 'Europe/London', label: '(GMT+00:00) 런던' },
  ];

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
                    activeTab === 'profile' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <FiUser className="mr-3" />
                  <span>프로필</span>
                </button>
              </li>
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
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-semibold mb-6">프로필 설정</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <FiUser className="w-8 h-8 text-gray-400" />
                      </div>
                      <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                        이미지 변경
                      </button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <Input
                        label="이름"
                        type="text"
                        placeholder="이름을 입력하세요"
                        defaultValue="관리자"
                      />
                      <Input
                        label="이메일"
                        type="email"
                        placeholder="이메일을 입력하세요"
                        defaultValue="admin@example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'general' && (
              <div>
                <h2 className="text-lg font-semibold mb-6">일반 설정</h2>
                <div className="space-y-6">
                  <Input
                    label="시스템 이름"
                    type="text"
                    value={systemName}
                    onChange={(e) => setSystemName(e.target.value)}
                  />

                  <Select
                    label="언어 설정"
                    options={languageOptions}
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  />

                  <Select
                    label="시간대"
                    options={timezoneOptions}
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      기본 테마
                    </label>
                    <div className="flex gap-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value="light"
                          checked={theme === 'light'}
                          onChange={(e) => setTheme(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2">라이트 모드</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value="dark"
                          checked={theme === 'dark'}
                          onChange={(e) => setTheme(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2">다크 모드</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value="system"
                          checked={theme === 'system'}
                          onChange={(e) => setTheme(e.target.value)}
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
                  <Input
                    label="세션 타임아웃 (분)"
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    min="5"
                  />

                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-4">비밀번호 변경</h3>
                    <div className="space-y-4">
                      <Input
                        label="현재 비밀번호"
                        type="password"
                        value={passwordChange.current}
                        onChange={(e) => setPasswordChange(prev => ({ ...prev, current: e.target.value }))}
                        placeholder="현재 비밀번호를 입력하세요"
                      />
                      <Input
                        label="새 비밀번호"
                        type="password"
                        value={passwordChange.new}
                        onChange={(e) => setPasswordChange(prev => ({ ...prev, new: e.target.value }))}
                        placeholder="새 비밀번호를 입력하세요"
                      />
                      <Input
                        label="비밀번호 확인"
                        type="password"
                        value={passwordChange.confirm}
                        onChange={(e) => setPasswordChange(prev => ({ ...prev, confirm: e.target.value }))}
                        placeholder="새 비밀번호를 다시 입력하세요"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      비밀번호 정책
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={passwordPolicy.minLength}
                          onChange={(e) => setPasswordPolicy(prev => ({ ...prev, minLength: e.target.checked }))}
                          className="text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-2 text-sm">최소 8자리 이상</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={passwordPolicy.uppercase}
                          onChange={(e) => setPasswordPolicy(prev => ({ ...prev, uppercase: e.target.checked }))}
                          className="text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-2 text-sm">대문자 포함</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={passwordPolicy.specialChar}
                          onChange={(e) => setPasswordPolicy(prev => ({ ...prev, specialChar: e.target.checked }))}
                          className="text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-2 text-sm">특수문자 포함</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={passwordPolicy.periodicChange}
                          onChange={(e) => setPasswordPolicy(prev => ({ ...prev, periodicChange: e.target.checked }))}
                          className="text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-2 text-sm">90일마다 변경 요구</span>
                      </label>
                    </div>
                  </div>

                  <Toggle
                    label="2단계 인증 활성화"
                    checked={twoFactorAuth}
                    onChange={(e) => setTwoFactorAuth(e.target.checked)}
                  />
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-semibold mb-6">알림 설정</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-700 mb-4">이메일 알림</h3>
                    <div className="space-y-4">
                      <Toggle
                        label="보안 알림"
                        checked={emailNotifications.security}
                        onChange={(e) => setEmailNotifications(prev => ({ ...prev, security: e.target.checked }))}
                      />
                      <Toggle
                        label="시스템 업데이트"
                        checked={emailNotifications.systemUpdate}
                        onChange={(e) => setEmailNotifications(prev => ({ ...prev, systemUpdate: e.target.checked }))}
                      />
                      <Toggle
                        label="주간 리포트"
                        checked={emailNotifications.weeklyReport}
                        onChange={(e) => setEmailNotifications(prev => ({ ...prev, weeklyReport: e.target.checked }))}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-700 mb-4">브라우저 알림</h3>
                    <div className="space-y-4">
                      <Toggle
                        label="새 메시지"
                        checked={browserNotifications.newMessage}
                        onChange={(e) => setBrowserNotifications(prev => ({ ...prev, newMessage: e.target.checked }))}
                      />
                      <Toggle
                        label="이벤트 알림"
                        checked={browserNotifications.eventAlert}
                        onChange={(e) => setBrowserNotifications(prev => ({ ...prev, eventAlert: e.target.checked }))}
                      />
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