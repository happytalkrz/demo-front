import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import AuthLayout from '../../../components/AuthLayout'

const Login = () => {
  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        로그인
      </h2>

      {/* 🔹 구글 로그인 버튼 */}
      <button className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition">
        <FaGoogle size={20} />
        <span>Google로 로그인</span>
      </button>

      <div className="relative my-6">
        <hr className="border-gray-300" />
        <span className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-white px-2 text-gray-500">
          또는
        </span>
      </div>

      {/* 🔹 이메일 로그인 폼 */}
      <form className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="이메일"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          로그인
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        계정이 없으신가요?{' '}
        <a href="/register" className="text-blue-500 font-medium hover:underline">
          회원가입
        </a>
      </p>
    </AuthLayout>
  )
}

export default Login
