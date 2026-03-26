import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiList, FiUsers, FiSettings, FiMessageSquare, FiCpu, FiLock, FiFileText, FiMessageCircle } from 'react-icons/fi';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationItems: NavItem[] = [
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

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold text-gray-800">관리 시스템</h1>
      </div>
      <nav className="mt-4">
        <ul>
          {navigationItems.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <Link
                to={path}
                className={`flex items-center px-4 py-3 hover:bg-gray-100 transition-colors ${
                  isActive(path) ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
              >
                <Icon className="mr-3" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;