import { FiBell, FiUser, FiLogOut } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-lg font-medium text-gray-900">
            {/* 페이지 제목은 각 페이지에서 설정 */}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* 알림 버튼 */}
          <button className="p-2 text-gray-400 hover:text-gray-600 relative">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* 사용자 메뉴 */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <FiUser className="w-4 h-4 text-gray-600" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-700">관리자</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>

            <button className="p-2 text-gray-400 hover:text-gray-600">
              <FiLogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;