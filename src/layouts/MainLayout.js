import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };
    return (_jsxs("div", { className: "flex h-screen bg-gray-100", children: [_jsx(Sidebar, { isOpen: isSidebarOpen, onClose: closeSidebar }), _jsxs("div", { className: "flex-1 flex flex-col overflow-hidden", children: [_jsx(Header, { onToggleSidebar: toggleSidebar }), _jsx("main", { className: "flex-1 p-6 overflow-auto", children: _jsx(Outlet, {}) })] })] }));
};
export default MainLayout;
