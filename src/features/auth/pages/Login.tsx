import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiGlobe, FiMail, FiEye, FiEyeOff } from 'react-icons/fi'
import AuthLayout from '../../../components/AuthLayout'
import Input from '../../../components/form/Input'
import { LoginFormData, FormErrors } from '../../../types/common'

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요'
    }

    if (!formData.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요'
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // TODO: 실제 로그인 API 호출
      console.log('로그인 데이터:', formData)

      // 임시 처리
      await new Promise(resolve => setTimeout(resolve, 1000))

    } catch (error) {
      console.error('로그인 실패:', error)
      setErrors({ general: '로그인에 실패했습니다. 다시 시도해주세요.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        로그인
      </h2>

      {/* 구글 로그인 버튼 */}
      <button
        type="button"
        className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition-colors"
      >
        <FiGlobe size={20} />
        <span>Google로 로그인</span>
      </button>

      <div className="relative my-6">
        <hr className="border-gray-300" />
        <span className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-white px-2 text-gray-500">
          또는
        </span>
      </div>

      {/* 이메일 로그인 폼 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        <Input
          type="email"
          name="email"
          label="이메일"
          placeholder="이메일을 입력하세요"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          leftIcon={<FiMail className="text-gray-400" />}
          required
        />

        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          rightIcon={
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          }
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        계정이 없으신가요?{' '}
        <Link
          to="/register"
          className="text-blue-500 font-medium hover:underline transition-colors"
        >
          회원가입
        </Link>
      </p>
    </AuthLayout>
  )
}

export default Login
