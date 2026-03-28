import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
const ProtectedRoute = ({ children, isAuthenticated = true, // 임시로 true로 설정 (실제로는 인증 상태 확인 로직 필요)
redirectTo = '/login' }) => {
    const location = useLocation();
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: redirectTo, state: { from: location }, replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default ProtectedRoute;
