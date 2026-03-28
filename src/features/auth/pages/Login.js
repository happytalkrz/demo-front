import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGlobe, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
import AuthLayout from '../../../components/AuthLayout';
import Input from '../../../components/form/Input';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = '이메일을 입력해주세요';
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = '올바른 이메일 형식을 입력해주세요';
        }
        if (!formData.password.trim()) {
            newErrors.password = '비밀번호를 입력해주세요';
        }
        else if (formData.password.length < 6) {
            newErrors.password = '비밀번호는 6자 이상이어야 합니다';
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
            // TODO: 실제 로그인 API 호출
            console.log('로그인 데이터:', formData);
            // 임시 처리
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        catch (error) {
            console.error('로그인 실패:', error);
            setErrors({ general: '로그인에 실패했습니다. 다시 시도해주세요.' });
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
    };
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };
    return (_jsxs(AuthLayout, { children: [_jsx("h2", { className: "text-3xl font-bold text-center text-gray-800 mb-6", children: "\uB85C\uADF8\uC778" }), _jsxs("button", { type: "button", className: "w-full flex items-center justify-center space-x-2 bg-red-500 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition-colors", children: [_jsx(FiGlobe, { size: 20 }), _jsx("span", { children: "Google\uB85C \uB85C\uADF8\uC778" })] }), _jsxs("div", { className: "relative my-6", children: [_jsx("hr", { className: "border-gray-300" }), _jsx("span", { className: "absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-white px-2 text-gray-500", children: "\uB610\uB294" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [errors.general && (_jsx("div", { className: "p-3 bg-red-50 border border-red-200 rounded-lg", children: _jsx("p", { className: "text-sm text-red-600", children: errors.general }) })), _jsx(Input, { type: "email", name: "email", label: "\uC774\uBA54\uC77C", placeholder: "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD558\uC138\uC694", value: formData.email, onChange: handleChange, error: errors.email, leftIcon: _jsx(FiMail, { className: "text-gray-400" }), required: true }), _jsx(Input, { type: showPassword ? 'text' : 'password', name: "password", label: "\uBE44\uBC00\uBC88\uD638", placeholder: "\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD558\uC138\uC694", value: formData.password, onChange: handleChange, error: errors.password, rightIcon: _jsx("button", { type: "button", onClick: togglePasswordVisibility, className: "text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto", children: showPassword ? _jsx(FiEyeOff, {}) : _jsx(FiEye, {}) }), required: true }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: isSubmitting ? '로그인 중...' : '로그인' })] }), _jsxs("p", { className: "text-center text-sm text-gray-500 mt-4", children: ["\uACC4\uC815\uC774 \uC5C6\uC73C\uC2E0\uAC00\uC694?", ' ', _jsx(Link, { to: "/register", className: "text-blue-500 font-medium hover:underline transition-colors", children: "\uD68C\uC6D0\uAC00\uC785" })] })] }));
};
export default Login;
