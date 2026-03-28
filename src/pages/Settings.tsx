import { useState } from 'react';
import type { ComponentType } from 'react';
import { FiSave, FiLock, FiUsers, FiMonitor, FiBell, FiUser } from 'react-icons/fi';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import Toggle from '../components/form/Toggle';
import { SelectOption } from '../types/common';
import { useToast } from '../hooks/useToast';

interface TabConfig {
  id: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
}

interface RolePermission {
  role: string;
  permissions: { label: string; checked: boolean }[];
}

const THEME_OPTIONS = [
  { value: 'light', label: '라이트 모드' },
  { value: 'dark', label: '다크 모드' },
  { value: 'system', label: '시스템 기본값' },
] as const;

const PASSWORD_POLICIES = {
  minLength: '최소 8자리 이상',
  uppercase: '대문자 포함',
  specialChar: '특수문자 포함',
  periodicChange: '90일마다 변경 요구',
} as const;

const EMAIL_NOTIFICATIONS = {
  security: '보안 알림',
  systemUpdate: '시스템 업데이트',
  weeklyReport: '주간 리포트',
} as const;

const BROWSER_NOTIFICATIONS = {
  newMessage: '새 메시지',
  eventAlert: '이벤트 알림',
} as const;

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { success, error } = useToast();

  const [profile, setProfile] = useState({
    name: '관리자',
    email: 'admin@example.com',
  });

  const [general, setGeneral] = useState({
    systemName: '관리 시스템',
    language: 'ko',
    timezone: 'Asia/Seoul',
    theme: 'light',
  });

  const [notifications, setNotifications] = useState({
    email: { security: true, systemUpdate: true, weeklyReport: true },
    browser: { newMessage: true, eventAlert: true },
  });

  const [security, setSecurity] = useState({
    sessionTimeout: '30',
    passwordPolicy: {
      minLength: true,
      uppercase: true,
      specialChar: true,
      periodicChange: true,
    },
    twoFactorAuth: false,
    passwordChange: { current: '', new: '', confirm: '' },
  });

  // 탭 설정
  const tabs: TabConfig[] = [
    { id: 'profile', icon: FiUser, label: '프로필' },
    { id: 'general', icon: FiMonitor, label: '일반 설정' },
    { id: 'security', icon: FiLock, label: '보안' },
    { id: 'notifications', icon: FiBell, label: '알림' },
    { id: 'permissions', icon: FiUsers, label: '권한 관리' },
  ];

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

  const saveMessages: Record<string, { title: string; message: string }> = {
    profile: { title: '프로필 저장 완료', message: '프로필 정보가 성공적으로 저장되었습니다.' },
    general: { title: '일반 설정 저장 완료', message: '일반 설정이 성공적으로 저장되었습니다.' },
    notifications: { title: '알림 설정 저장 완료', message: '알림 설정이 성공적으로 저장되었습니다.' },
    security: { title: '보안 설정 저장 완료', message: '보안 설정이 성공적으로 저장되었습니다.' },
    permissions: { title: '권한 설정 저장 완료', message: '권한 설정이 성공적으로 저장되었습니다.' },
  };

  const rolePermissions: RolePermission[] = [
    {
      role: '관리자',
      permissions: [
        { label: '모든 시스템 접근', checked: true },
        { label: '사용자 관리', checked: true },
        { label: '설정 변경', checked: true },
      ],
    },
    {
      role: '편집자',
      permissions: [
        { label: '콘텐츠 생성', checked: true },
        { label: '콘텐츠 수정', checked: true },
        { label: '콘텐츠 삭제', checked: false },
      ],
    },
  ];

  const validatePassword = (pwd: typeof security.passwordChange): string | null => {
    if (pwd.current || pwd.new || pwd.confirm) {
      if (!pwd.current) return '현재 비밀번호를 입력해주세요.';
      if (!pwd.new) return '새 비밀번호를 입력해주세요.';
      if (pwd.new !== pwd.confirm) return '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.';
      if (pwd.new.length < 8) return '새 비밀번호는 최소 8자리 이상이어야 합니다.';
    }
    return null;
  };

  const handleSave = () => {
    if (activeTab === 'security') {
      const errorMsg = validatePassword(security.passwordChange);
      if (errorMsg) {
        error('비밀번호 변경 오류', errorMsg);
        return;
      }
      if (security.passwordChange.current) {
        setSecurity({ ...security, passwordChange: { current: '', new: '', confirm: '' } });
      }
    }

    const message = saveMessages[activeTab];
    if (message) {
      success(message.title, message.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">설정</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* 탭 메뉴 */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow">
            <ul>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <li key={tab.id}>
                    <button
                      className={`flex items-center w-full px-4 py-3 text-left ${
                        activeTab === tab.id ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <Icon className="mr-3" />
                      <span>{tab.label}</span>
                    </button>
                  </li>
                );
              })}
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
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      />
                      <Input
                        label="이메일"
                        type="email"
                        placeholder="이메일을 입력하세요"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
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
                    value={general.systemName}
                    onChange={(e) => setGeneral({ ...general, systemName: e.target.value })}
                  />

                  <Select
                    label="언어 설정"
                    options={languageOptions}
                    value={general.language}
                    onChange={(e) => setGeneral({ ...general, language: e.target.value })}
                  />

                  <Select
                    label="시간대"
                    options={timezoneOptions}
                    value={general.timezone}
                    onChange={(e) => setGeneral({ ...general, timezone: e.target.value })}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      기본 테마
                    </label>
                    <div className="flex gap-4">
                      {THEME_OPTIONS.map(({ value, label }) => (
                        <label key={value} className="inline-flex items-center">
                          <input
                            type="radio"
                            name="theme"
                            value={value}
                            checked={general.theme === value}
                            onChange={(e) => setGeneral({ ...general, theme: e.target.value })}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2">{label}</span>
                        </label>
                      ))}
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
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                    min="5"
                  />

                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-4">비밀번호 변경</h3>
                    <div className="space-y-4">
                      <Input
                        label="현재 비밀번호"
                        type="password"
                        value={security.passwordChange.current}
                        onChange={(e) => setSecurity({ ...security, passwordChange: { ...security.passwordChange, current: e.target.value } })}
                        placeholder="현재 비밀번호를 입력하세요"
                      />
                      <Input
                        label="새 비밀번호"
                        type="password"
                        value={security.passwordChange.new}
                        onChange={(e) => setSecurity({ ...security, passwordChange: { ...security.passwordChange, new: e.target.value } })}
                        placeholder="새 비밀번호를 입력하세요"
                      />
                      <Input
                        label="비밀번호 확인"
                        type="password"
                        value={security.passwordChange.confirm}
                        onChange={(e) => setSecurity({ ...security, passwordChange: { ...security.passwordChange, confirm: e.target.value } })}
                        placeholder="새 비밀번호를 다시 입력하세요"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      비밀번호 정책
                    </label>
                    <div className="space-y-2">
                      {Object.entries(PASSWORD_POLICIES).map(([key, label]) => (
                        <label key={key} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={security.passwordPolicy[key as keyof typeof security.passwordPolicy]}
                            onChange={(e) => setSecurity({
                              ...security,
                              passwordPolicy: { ...security.passwordPolicy, [key]: e.target.checked },
                            })}
                            className="text-blue-600 focus:ring-blue-500 rounded"
                          />
                          <span className="ml-2 text-sm">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Toggle
                    label="2단계 인증 활성화"
                    checked={security.twoFactorAuth}
                    onChange={(e) => setSecurity({ ...security, twoFactorAuth: e.target.checked })}
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
                      {Object.entries(EMAIL_NOTIFICATIONS).map(([key, label]) => (
                        <Toggle
                          key={key}
                          label={label}
                          checked={notifications.email[key as keyof typeof notifications.email]}
                          onChange={(e) => setNotifications({
                            ...notifications,
                            email: { ...notifications.email, [key]: e.target.checked },
                          })}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-700 mb-4">브라우저 알림</h3>
                    <div className="space-y-4">
                      {Object.entries(BROWSER_NOTIFICATIONS).map(([key, label]) => (
                        <Toggle
                          key={key}
                          label={label}
                          checked={notifications.browser[key as keyof typeof notifications.browser]}
                          onChange={(e) => setNotifications({
                            ...notifications,
                            browser: { ...notifications.browser, [key]: e.target.checked },
                          })}
                        />
                      ))}
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
                      {rolePermissions.map((role) => (
                        <div key={role.role} className="border p-4 rounded-md">
                          <h3 className="font-medium mb-2">{role.role}</h3>
                          <div className="space-y-2">
                            {role.permissions.map((perm) => (
                              <label key={perm.label} className="flex items-center">
                                <input
                                  type="checkbox"
                                  defaultChecked={perm.checked}
                                  className="text-blue-600 focus:ring-blue-500 rounded"
                                />
                                <span className="ml-2 text-sm">{perm.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
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
                onClick={handleSave}
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