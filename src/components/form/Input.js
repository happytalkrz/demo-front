import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
const Input = forwardRef(({ label, error, helperText, leftIcon, rightIcon, className = '', ...props }, ref) => {
    const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors';
    const errorClasses = error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300';
    const iconPadding = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '';
    return (_jsxs("div", { className: "space-y-1", children: [label && (_jsx("label", { className: "block text-sm font-medium text-gray-700", children: label })), _jsxs("div", { className: "relative", children: [leftIcon && (_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: leftIcon })), _jsx("input", { ref: ref, className: `${baseClasses} ${errorClasses} ${iconPadding} ${className}`, ...props }), rightIcon && (_jsx("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center", children: rightIcon }))] }), error && (_jsx("p", { className: "text-sm text-red-600", children: error })), helperText && !error && (_jsx("p", { className: "text-sm text-gray-500", children: helperText }))] }));
});
Input.displayName = 'Input';
export default Input;
