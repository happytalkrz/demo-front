import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiUser, FiMail, FiEye, FiEyeOff, FiLock } from 'react-icons/fi'
import AuthLayout from '../../../components/AuthLayout'
import Input from '../../../components/form/Input'
import { RegisterFormData, FormErrors } from '../../../types/common'

const Register = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '이름은 2자 이상이어야 합니다'
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요'
    }

    if (!formData.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요'
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다'
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = '비밀번호는 영문과 숫자를 포함해야 합니다'
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // TODO: 실제 회원가입 API 호출
      console.log('회원가입 데이터:', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      })

      // 임시 처리
      await new Promise(resolve => setTimeout(resolve, 1500))

    } catch (error) {
      console.error('회원가입 실패:', error)
      setErrors({ general: '회원가입에 실패했습니다. 다시 시도해주세요.' })
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

    // 비밀번호 확인 실시간 검사
    if (name === 'password' && formData.confirmPassword) {
      if (value !== formData.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다' }))
      } else {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors.confirmPassword
          return newErrors
        })
      }
    }

    if (name === 'confirmPassword' && formData.password) {
      if (formData.password !== value) {
        setErrors(prev => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다' }))
      } else {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors.confirmPassword
          return newErrors
        })
      }
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev)
  }

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        회원가입
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        <Input
          type="text"
          name="name"
          label="이름"
          placeholder="이름을 입력하세요"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          leftIcon={<FiUser className="text-gray-400" />}
          required
        />

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
          helperText="영문, 숫자 포함 8자 이상"
          leftIcon={<FiLock className="text-gray-400" />}
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

        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력하세요"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          leftIcon={<FiLock className="text-gray-400" />}
          rightIcon={
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          }
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-500 text-white py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '가입 중...' : '회원가입'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        이미 계정이 있으신가요?{' '}
        <Link
          to="/login"
          className="text-blue-500 font-medium hover:underline transition-colors"
        >
          로그인
        </Link>
      </p>
    </AuthLayout>
  )
}

export default Register
