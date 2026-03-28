import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';
const Select = forwardRef(({ label, error, helperText, options, placeholder, className = '', ...props }, ref) => {
    const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white';
    const errorClasses = error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300';
    return (_jsxs("div", { className: "space-y-1", children: [label && (_jsx("label", { className: "block text-sm font-medium text-gray-700", children: label })), _jsxs("div", { className: "relative", children: [_jsxs("select", { ref: ref, className: `${baseClasses} ${errorClasses} ${className}`, ...props, children: [placeholder && (_jsx("option", { value: "", disabled: true, children: placeholder })), options.map((option) => (_jsx("option", { value: option.value, disabled: option.disabled, children: option.label }, option.value)))] }), _jsx("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none", children: _jsx(FiChevronDown, { className: "h-4 w-4 text-gray-400" }) })] }), error && (_jsx("p", { className: "text-sm text-red-600", children: error })), helperText && !error && (_jsx("p", { className: "text-sm text-gray-500", children: helperText }))] }));
});
Select.displayName = 'Select';
export default Select;
