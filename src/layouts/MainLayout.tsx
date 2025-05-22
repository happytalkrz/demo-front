import { Link, Outlet } from 'react-router-dom';
import { FiHome, FiList, FiUsers, FiSettings, FiMessageSquare, FiCpu, FiLock, FiFileText, FiMessageCircle } from 'react-icons/fi';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* 사이드바 */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold text-gray-800">관리 시스템</h1>
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link to="/dashboard" className="flex items-center px-4 py-3 hover:bg-gray-100">
                <FiHome className="mr-3" />
                <span>대시보드</span>
              </Link>
            </li>
            <li>
              <Link to="/board" className="flex items-center px-4 py-3 hover:bg-gray-100">
                <FiList className="mr-3" />
                <span>게시판</span>
              </Link>
            </li>
            <li>
              <Link to="/users" className="flex items-center px-4 py-3 hover:bg-gray-100">
                <FiUsers className="mr-3" />
                <span>사용자 관리</span>
              </Link>
            </li>
            <li>
              <Link to="/data-table" className="flex items-center px-4 py-3 hover:bg-gray-100">
                <FiList className="mr-3" />
                <span>데이터 테이블</span>
              </Link>
            </li>
            <li>
              <Link to="/ai-chat-demo" className="flex items-center px-4 py-3 hover:bg-gray-100 bg-blue-50 text-blue-600">
                <FiMessageCircle className="mr-3" />
                <span>AI 상담 솔루션 데모</span>
              </Link>
            </li>
            <li>
              <Link to="/prompt-management" className="flex items-center px-4 py-3 hover:bg-gray-100">
                <FiFileText className="mr-3" />
                <span>프롬프트 관리</span>
              </Link>
            </li>
            <li>
              <Link to="/prompts" className="flex items-center px-4 py-3 hover:bg-gray-100">
                <FiMessageSquare className="mr-3" />
                <span>프롬프트 설정</span>
              </Link>
            </li>
            <li>
              <Link to="/ai-summary" className="flex items-center px-4 py-3 hover:bg-gray-100">
                <FiCpu className="mr-3" />
                <span>AI 상담 요약 관리</span>
              </Link>
            </li>
            <li>
              <Link to="/ai-permissions" className="flex items-center px-4 py-3 hover:bg-gray-100">
                <FiLock className="mr-3" />
                <span>AI 권한 관리</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center px-4 py-3 hover:bg-gray-100">
                <FiSettings className="mr-3" />
                <span>설정</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout; 