import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import { ToastContainer } from './components/common/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board';
import Users from './pages/Users';
import DataTable from './pages/DataTable';
import Settings from './pages/Settings';
import Prompts from './pages/Prompts';
import AISummary from './pages/AISummary';
import AIPermissions from './pages/AIPermissions';
import PromptManagement from './pages/PromptManagement';
import AIChatDemo from './pages/AIChatDemo';
import NotFound from './pages/NotFound';
function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(ToastProvider, { children: [_jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsxs(Route, { path: "/", element: _jsx(ProtectedRoute, { children: _jsx(MainLayout, {}) }), children: [_jsx(Route, { index: true, element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "board", element: _jsx(Board, {}) }), _jsx(Route, { path: "users", element: _jsx(Users, {}) }), _jsx(Route, { path: "data-table", element: _jsx(DataTable, {}) }), _jsx(Route, { path: "prompts", element: _jsx(Prompts, {}) }), _jsx(Route, { path: "ai-summary", element: _jsx(AISummary, {}) }), _jsx(Route, { path: "ai-permissions", element: _jsx(AIPermissions, {}) }), _jsx(Route, { path: "prompt-management", element: _jsx(PromptManagement, {}) }), _jsx(Route, { path: "ai-chat-demo", element: _jsx(AIChatDemo, {}) }), _jsx(Route, { path: "settings", element: _jsx(Settings, {}) })] }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }), _jsx(ToastContainer, {})] }) }));
}
export default App;
