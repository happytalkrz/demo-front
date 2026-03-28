import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiList, FiUsers, FiSettings, FiMessageSquare, FiCpu, FiLock, FiFileText, FiMessageCircle, FiX } from 'react-icons/fi';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
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

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* 모바일 오버레이 백드롭 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* 사이드바 */}
      <aside className={`
        fixed md:static
        top-0 left-0
        h-full w-64
        bg-white shadow-md
        transform transition-transform duration-300 ease-in-out
        z-50 md:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">관리 시스템</h1>
          {/* 모바일 닫기 버튼 */}
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 md:hidden"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            {navigationItems.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={onClose}
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
    </>
  );
};

export default Sidebar;