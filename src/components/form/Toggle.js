import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Toggle = ({ label, description, size = 'md', className = '', checked, onChange, disabled, ...props }) => {
    const sizeClasses = {
        sm: {
            container: 'w-8 h-4',
            thumb: 'w-3 h-3',
            translate: checked ? 'translate-x-4' : 'translate-x-0.5',
        },
        md: {
            container: 'w-11 h-6',
            thumb: 'w-5 h-5',
            translate: checked ? 'translate-x-5' : 'translate-x-0.5',
        },
        lg: {
            container: 'w-14 h-7',
            thumb: 'w-6 h-6',
            translate: checked ? 'translate-x-7' : 'translate-x-0.5',
        },
    };
    const currentSize = sizeClasses[size];
    return (_jsxs("div", { className: `flex items-center ${className}`, children: [_jsxs("div", { className: "flex items-center", children: [_jsx("button", { type: "button", className: `
            relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent
            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2
            focus:ring-blue-500 focus:ring-offset-2
            ${currentSize.container}
            ${checked ? 'bg-blue-600' : 'bg-gray-200'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `, role: "switch", "aria-checked": checked, onClick: () => !disabled && onChange?.({ target: { checked: !checked } }), disabled: disabled, children: _jsx("span", { className: `
              pointer-events-none inline-block rounded-full bg-white shadow transform ring-0
              transition duration-200 ease-in-out
              ${currentSize.thumb}
              ${currentSize.translate}
            ` }) }), _jsx("input", { type: "checkbox", className: "sr-only", checked: checked, onChange: onChange, disabled: disabled, ...props })] }), (label || description) && (_jsxs("div", { className: "ml-3", children: [label && (_jsx("label", { className: `block text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`, children: label })), description && (_jsx("p", { className: `text-sm ${disabled ? 'text-gray-300' : 'text-gray-500'}`, children: description }))] }))] }));
};
export default Toggle;
