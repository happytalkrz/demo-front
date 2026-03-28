import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
import AuthLayout from '../../../components/AuthLayout';
import Input from '../../../components/form/Input';
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = '이름을 입력해주세요';
        }
        else if (formData.name.trim().length < 2) {
            newErrors.name = '이름은 2자 이상이어야 합니다';
        }
        if (!formData.email.trim()) {
            newErrors.email = '이메일을 입력해주세요';
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = '올바른 이메일 형식을 입력해주세요';
        }
        if (!formData.password.trim()) {
            newErrors.password = '비밀번호를 입력해주세요';
        }
        else if (formData.password.length < 8) {
            newErrors.password = '비밀번호는 8자 이상이어야 합니다';
        }
        else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = '비밀번호는 영문과 숫자를 포함해야 합니다';
        }
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = '비밀번호 확인을 입력해주세요';
        }
        else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm())
            return;
        setIsSubmitting(true);
        try {
            // TODO: 실제 회원가입 API 호출
            console.log('회원가입 데이터:', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            // 임시 처리
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
        catch (error) {
            console.error('회원가입 실패:', error);
            setErrors({ general: '회원가입에 실패했습니다. 다시 시도해주세요.' });
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // 에러 메시지 초기화
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        // 비밀번호 확인 실시간 검사
        if (name === 'password' && formData.confirmPassword) {
            if (value !== formData.confirmPassword) {
                setErrors(prev => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다' }));
            }
            else {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.confirmPassword;
                    return newErrors;
                });
            }
        }
        if (name === 'confirmPassword' && formData.password) {
            if (formData.password !== value) {
                setErrors(prev => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다' }));
            }
            else {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.confirmPassword;
                    return newErrors;
                });
            }
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prev => !prev);
    };
    return (_jsxs(AuthLayout, { children: [_jsx("h2", { className: "text-3xl font-bold text-center text-gray-800 mb-6", children: "\uD68C\uC6D0\uAC00\uC785" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [errors.general && (_jsx("div", { className: "p-3 bg-red-50 border border-red-200 rounded-lg", children: _jsx("p", { className: "text-sm text-red-600", children: errors.general }) })), _jsx(Input, { type: "text", name: "name", label: "\uC774\uB984", placeholder: "\uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694", value: formData.name, onChange: handleChange, error: errors.name, leftIcon: _jsx(FiUser, { className: "text-gray-400" }), required: true }), _jsx(Input, { type: "email", name: "email", label: "\uC774\uBA54\uC77C", placeholder: "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD558\uC138\uC694", value: formData.email, onChange: handleChange, error: errors.email, leftIcon: _jsx(FiMail, { className: "text-gray-400" }), required: true }), _jsx(Input, { type: showPassword ? 'text' : 'password', name: "password", label: "\uBE44\uBC00\uBC88\uD638", placeholder: "\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694", value: formData.password, onChange: handleChange, error: errors.password, helperText: "\uC601\uBB38, \uC22B\uC790 \uD3EC\uD568 8\uC790 \uC774\uC0C1", leftIcon: _jsx(FiLock, { className: "text-gray-400" }), rightIcon: _jsx("button", { type: "button", onClick: togglePasswordVisibility, className: "text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto", children: showPassword ? _jsx(FiEyeOff, {}) : _jsx(FiEye, {}) }), required: true }), _jsx(Input, { type: showConfirmPassword ? 'text' : 'password', name: "confirmPassword", label: "\uBE44\uBC00\uBC88\uD638 \uD655\uC778", placeholder: "\uBE44\uBC00\uBC88\uD638\uB97C \uB2E4\uC2DC \uC785\uB825\uD558\uC138\uC694", value: formData.confirmPassword, onChange: handleChange, error: errors.confirmPassword, leftIcon: _jsx(FiLock, { className: "text-gray-400" }), rightIcon: _jsx("button", { type: "button", onClick: toggleConfirmPasswordVisibility, className: "text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto", children: showConfirmPassword ? _jsx(FiEyeOff, {}) : _jsx(FiEye, {}) }), required: true }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full bg-green-500 text-white py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: isSubmitting ? '가입 중...' : '회원가입' })] }), _jsxs("p", { className: "text-center text-sm text-gray-500 mt-4", children: ["\uC774\uBBF8 \uACC4\uC815\uC774 \uC788\uC73C\uC2E0\uAC00\uC694?", ' ', _jsx(Link, { to: "/login", className: "text-blue-500 font-medium hover:underline transition-colors", children: "\uB85C\uADF8\uC778" })] })] }));
};
export default Register;
