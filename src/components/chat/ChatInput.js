import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const ChatInput = ({ onSendMessage, selectedRole, onRoleChange }) => {
    const [message, setMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message, selectedRole);
            setMessage('');
        }
    };
    const toggleRole = () => {
        onRoleChange(selectedRole === 'customer' ? 'counselor' : 'customer');
    };
    return (_jsxs("div", { className: "border-t border-gray-200 p-4", children: [_jsxs("div", { className: "flex items-center mb-3", children: [_jsx("button", { type: "button", onClick: toggleRole, className: `flex items-center px-3 py-1 rounded-md text-sm ${selectedRole === 'counselor'
                            ? 'bg-gray-700 text-white'
                            : 'bg-gray-100 text-gray-800'}`, children: selectedRole === 'customer' ? '고객' : '상담사' }), _jsx("div", { className: "text-xs text-gray-500 ml-2", children: "\uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "flex relative", children: [_jsx("input", { type: "text", value: message, onChange: (e) => setMessage(e.target.value), className: "flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white pr-12", placeholder: "\uB0B4\uC6A9\uC744 \uC785\uB825 \uD558\uC138\uC694..." }), _jsx("button", { type: "submit", className: "absolute right-2 top-1/2 transform -translate-y-1/2", children: _jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M20 4L3 11L10 14L13 21L20 4Z", stroke: "#888888", strokeWidth: "2", strokeLinejoin: "round" }) }) })] })] }));
};
export default ChatInput;
