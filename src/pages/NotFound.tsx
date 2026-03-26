import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray-500 mb-8 max-w-md">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          URL을 다시 확인해 주세요.
        </p>

        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiHome className="w-4 h-4 mr-2" />
            대시보드로 돌아가기
          </Link>

          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              이전 페이지로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;