import React from 'react'
import { FaUser } from 'react-icons/fa'
import AuthLayout from '../../../components/AuthLayout'

const Register = () => {
  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        회원가입
      </h2>

      <form className="flex flex-col space-y-4">
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="이름"
            className="p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
          />
        </div>
        <input
          type="email"
          placeholder="이메일"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-3 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          회원가입
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        이미 계정이 있으신가요?{' '}
        <a href="/login" className="text-blue-500 font-medium hover:underline">
          로그인
        </a>
      </p>
    </AuthLayout>
  )
}

export default Register
