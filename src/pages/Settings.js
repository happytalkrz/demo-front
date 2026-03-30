import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FiSave, FiLock, FiUsers, FiMonitor, FiBell, FiUser } from 'react-icons/fi';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import Toggle from '../components/form/Toggle';
import { useToast } from '../hooks/useToast';
const THEME_OPTIONS = [
    { value: 'light', label: '라이트 모드' },
    { value: 'dark', label: '다크 모드' },
    { value: 'system', label: '시스템 기본값' },
];
const PASSWORD_POLICIES = {
    minLength: '최소 8자리 이상',
    uppercase: '대문자 포함',
    specialChar: '특수문자 포함',
    periodicChange: '90일마다 변경 요구',
};
const EMAIL_NOTIFICATIONS = {
    security: '보안 알림',
    systemUpdate: '시스템 업데이트',
    weeklyReport: '주간 리포트',
};
const BROWSER_NOTIFICATIONS = {
    newMessage: '새 메시지',
    eventAlert: '이벤트 알림',
};
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
    const tabs = [
        { id: 'profile', icon: FiUser, label: '프로필' },
        { id: 'general', icon: FiMonitor, label: '일반 설정' },
        { id: 'security', icon: FiLock, label: '보안' },
        { id: 'notifications', icon: FiBell, label: '알림' },
        { id: 'permissions', icon: FiUsers, label: '권한 관리' },
    ];
    // Select options
    const languageOptions = [
        { value: 'ko', label: '한국어' },
        { value: 'en', label: 'English' },
        { value: 'ja', label: '日本語' },
        { value: 'zh', label: '中文' },
    ];
    const timezoneOptions = [
        { value: 'Asia/Seoul', label: '(GMT+09:00) 서울' },
        { value: 'Asia/Tokyo', label: '(GMT+09:00) 도쿄' },
        { value: 'America/New_York', label: '(GMT-05:00) 뉴욕' },
        { value: 'Europe/London', label: '(GMT+00:00) 런던' },
    ];
    const saveMessages = {
        profile: { title: '프로필 저장 완료', message: '프로필 정보가 성공적으로 저장되었습니다.' },
        general: { title: '일반 설정 저장 완료', message: '일반 설정이 성공적으로 저장되었습니다.' },
        notifications: { title: '알림 설정 저장 완료', message: '알림 설정이 성공적으로 저장되었습니다.' },
        security: { title: '보안 설정 저장 완료', message: '보안 설정이 성공적으로 저장되었습니다.' },
        permissions: { title: '권한 설정 저장 완료', message: '권한 설정이 성공적으로 저장되었습니다.' },
    };
    const rolePermissions = [
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
    const validatePassword = (pwd) => {
        if (pwd.current || pwd.new || pwd.confirm) {
            if (!pwd.current)
                return '현재 비밀번호를 입력해주세요.';
            if (!pwd.new)
                return '새 비밀번호를 입력해주세요.';
            if (pwd.new !== pwd.confirm)
                return '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.';
            if (pwd.new.length < 8)
                return '새 비밀번호는 최소 8자리 이상이어야 합니다.';
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
    return (_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold mb-6", children: "\uC124\uC815" }), _jsxs("div", { className: "flex flex-col md:flex-row gap-6", children: [_jsx("div", { className: "md:w-1/4", children: _jsx("div", { className: "bg-white rounded-lg shadow", children: _jsx("ul", { children: tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (_jsx("li", { children: _jsxs("button", { className: `flex items-center w-full px-4 py-3 text-left ${activeTab === tab.id ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'hover:bg-gray-50'}`, onClick: () => setActiveTab(tab.id), children: [_jsx(Icon, { className: "mr-3" }), _jsx("span", { children: tab.label })] }) }, tab.id));
                                }) }) }) }), _jsx("div", { className: "md:w-3/4", children: _jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [activeTab === 'profile' && (_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-6", children: "\uD504\uB85C\uD544 \uC124\uC815" }), _jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "flex items-center space-x-6", children: [_jsxs("div", { className: "flex-shrink-0", children: [_jsx("div", { className: "w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center", children: _jsx(FiUser, { className: "w-8 h-8 text-gray-400" }) }), _jsx("button", { className: "mt-2 text-sm text-blue-600 hover:text-blue-800", children: "\uC774\uBBF8\uC9C0 \uBCC0\uACBD" })] }), _jsxs("div", { className: "flex-1 space-y-4", children: [_jsx(Input, { label: "\uC774\uB984", type: "text", placeholder: "\uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694", value: profile.name, onChange: (e) => setProfile(prev => ({ ...prev, name: e.target.value })) }), _jsx(Input, { label: "\uC774\uBA54\uC77C", type: "email", placeholder: "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD558\uC138\uC694", value: profile.email, onChange: (e) => setProfile(prev => ({ ...prev, email: e.target.value })) })] })] }) })] })), activeTab === 'general' && (_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-6", children: "\uC77C\uBC18 \uC124\uC815" }), _jsxs("div", { className: "space-y-6", children: [_jsx(Input, { label: "\uC2DC\uC2A4\uD15C \uC774\uB984", type: "text", value: general.systemName, onChange: (e) => setGeneral({ ...general, systemName: e.target.value }) }), _jsx(Select, { label: "\uC5B8\uC5B4 \uC124\uC815", options: languageOptions, value: general.language, onChange: (e) => setGeneral({ ...general, language: e.target.value }) }), _jsx(Select, { label: "\uC2DC\uAC04\uB300", options: timezoneOptions, value: general.timezone, onChange: (e) => setGeneral({ ...general, timezone: e.target.value }) }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-3", children: "\uAE30\uBCF8 \uD14C\uB9C8" }), _jsx("div", { className: "flex gap-4", children: THEME_OPTIONS.map(({ value, label }) => (_jsxs("label", { className: "inline-flex items-center", children: [_jsx("input", { type: "radio", name: "theme", value: value, checked: general.theme === value, onChange: (e) => setGeneral({ ...general, theme: e.target.value }), className: "text-blue-600 focus:ring-blue-500" }), _jsx("span", { className: "ml-2", children: label })] }, value))) })] })] })] })), activeTab === 'security' && (_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-6", children: "\uBCF4\uC548 \uC124\uC815" }), _jsxs("div", { className: "space-y-6", children: [_jsx(Input, { label: "\uC138\uC158 \uD0C0\uC784\uC544\uC6C3 (\uBD84)", type: "number", value: security.sessionTimeout, onChange: (e) => setSecurity({ ...security, sessionTimeout: e.target.value }), min: "5" }), _jsxs("div", { children: [_jsx("h3", { className: "text-base font-medium text-gray-900 mb-4", children: "\uBE44\uBC00\uBC88\uD638 \uBCC0\uACBD" }), _jsxs("div", { className: "space-y-4", children: [_jsx(Input, { label: "\uD604\uC7AC \uBE44\uBC00\uBC88\uD638", type: "password", value: security.passwordChange.current, onChange: (e) => setSecurity({ ...security, passwordChange: { ...security.passwordChange, current: e.target.value } }), placeholder: "\uD604\uC7AC \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694" }), _jsx(Input, { label: "\uC0C8 \uBE44\uBC00\uBC88\uD638", type: "password", value: security.passwordChange.new, onChange: (e) => setSecurity({ ...security, passwordChange: { ...security.passwordChange, new: e.target.value } }), placeholder: "\uC0C8 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694" }), _jsx(Input, { label: "\uBE44\uBC00\uBC88\uD638 \uD655\uC778", type: "password", value: security.passwordChange.confirm, onChange: (e) => setSecurity({ ...security, passwordChange: { ...security.passwordChange, confirm: e.target.value } }), placeholder: "\uC0C8 \uBE44\uBC00\uBC88\uD638\uB97C \uB2E4\uC2DC \uC785\uB825\uD558\uC138\uC694" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-3", children: "\uBE44\uBC00\uBC88\uD638 \uC815\uCC45" }), _jsx("div", { className: "space-y-2", children: Object.entries(PASSWORD_POLICIES).map(([key, label]) => (_jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: security.passwordPolicy[key], onChange: (e) => setSecurity({
                                                                            ...security,
                                                                            passwordPolicy: { ...security.passwordPolicy, [key]: e.target.checked },
                                                                        }), className: "text-blue-600 focus:ring-blue-500 rounded" }), _jsx("span", { className: "ml-2 text-sm", children: label })] }, key))) })] }), _jsx(Toggle, { label: "2\uB2E8\uACC4 \uC778\uC99D \uD65C\uC131\uD654", checked: security.twoFactorAuth, onChange: (e) => setSecurity({ ...security, twoFactorAuth: e.target.checked }) })] })] })), activeTab === 'notifications' && (_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-6", children: "\uC54C\uB9BC \uC124\uC815" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-base font-medium text-gray-700 mb-4", children: "\uC774\uBA54\uC77C \uC54C\uB9BC" }), _jsx("div", { className: "space-y-4", children: Object.entries(EMAIL_NOTIFICATIONS).map(([key, label]) => (_jsx(Toggle, { label: label, checked: notifications.email[key], onChange: (e) => setNotifications({
                                                                    ...notifications,
                                                                    email: { ...notifications.email, [key]: e.target.checked },
                                                                }) }, key))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-base font-medium text-gray-700 mb-4", children: "\uBE0C\uB77C\uC6B0\uC800 \uC54C\uB9BC" }), _jsx("div", { className: "space-y-4", children: Object.entries(BROWSER_NOTIFICATIONS).map(([key, label]) => (_jsx(Toggle, { label: label, checked: notifications.browser[key], onChange: (e) => setNotifications({
                                                                    ...notifications,
                                                                    browser: { ...notifications.browser, [key]: e.target.checked },
                                                                }) }, key))) })] })] })] })), activeTab === 'permissions' && (_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-6", children: "\uAD8C\uD55C \uAD00\uB9AC" }), _jsx("div", { className: "space-y-6", children: _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-3", children: "\uC5ED\uD560\uBCC4 \uAD8C\uD55C" }), _jsx("div", { className: "space-y-4", children: rolePermissions.map((role) => (_jsxs("div", { className: "border p-4 rounded-md", children: [_jsx("h3", { className: "font-medium mb-2", children: role.role }), _jsx("div", { className: "space-y-2", children: role.permissions.map((perm) => (_jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", defaultChecked: perm.checked, className: "text-blue-600 focus:ring-blue-500 rounded" }), _jsx("span", { className: "ml-2 text-sm", children: perm.label })] }, perm.label))) })] }, role.role))) })] }) })] })), _jsxs("div", { className: "mt-8 flex justify-end", children: [_jsx("button", { type: "button", className: "px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition mr-2", children: "\uCDE8\uC18C" }), _jsxs("button", { type: "button", onClick: handleSave, className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center", children: [_jsx(FiSave, { className: "mr-2" }), " \uC800\uC7A5"] })] })] }) })] })] }));
};
export default Settings;
