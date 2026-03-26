import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  isAuthenticated = true, // 임시로 true로 설정 (실제로는 인증 상태 확인 로직 필요)
  redirectTo = '/login'
}: ProtectedRouteProps) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;