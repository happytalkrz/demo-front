import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiList, FiUsers, FiSettings, FiMessageSquare, FiCpu, FiLock, FiFileText, FiMessageCircle, FiX } from 'react-icons/fi';
const navigationItems = [
    { path: '/dashboard', label: '대시보드', icon: FiHome },
    { path: '/board', label: '게시판', icon: FiList },
    { path: '/users', label: '사용자 관리', icon: FiUsers },
    { path: '/data-table', label: '데이터 테이블', icon: FiList },
    { path: '/ai-chat-demo', label: 'AI 상담 솔루션 데모', icon: FiMessageCircle },
    { path: '/prompt-management', label: '프롬프트 관리', icon: FiFileText },
    { path: '/prompts', label: '프롬프트 설정', icon: FiMessageSquare },
    { path: '/ai-summary', label: 'AI 상담 요약 관리', icon: FiCpu },
    { path: '/ai-permissions', label: 'AI 권한 관리', icon: FiLock },
    { path: '/settings', label: '설정', icon: FiSettings },
];
const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path;
    };
    return (_jsxs(_Fragment, { children: [isOpen && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden", onClick: onClose })), _jsxs("aside", { className: `
        fixed md:static
        top-0 left-0
        h-full w-64
        bg-white shadow-md
        transform transition-transform duration-300 ease-in-out
        z-50 md:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `, children: [_jsxs("div", { className: "p-4 border-b flex items-center justify-between", children: [_jsx("h1", { className: "text-xl font-semibold text-gray-800", children: "\uAD00\uB9AC \uC2DC\uC2A4\uD15C" }), _jsx("button", { onClick: onClose, className: "p-2 text-gray-400 hover:text-gray-600 md:hidden", children: _jsx(FiX, { className: "w-5 h-5" }) })] }), _jsx("nav", { className: "mt-4", children: _jsx("ul", { children: navigationItems.map(({ path, label, icon: Icon }) => (_jsx("li", { children: _jsxs(Link, { to: path, onClick: onClose, className: `flex items-center px-4 py-3 hover:bg-gray-100 transition-colors ${isActive(path) ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'}`, children: [_jsx(Icon, { className: "mr-3" }), _jsx("span", { children: label })] }) }, path))) }) })] })] }));
};
export default Sidebar;
