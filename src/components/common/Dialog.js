import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { FiAlertTriangle, FiInfo, FiCheckCircle } from 'react-icons/fi';
const Dialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = '확인', cancelText = '취소', variant = 'danger', showIcon = true }) => {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);
    if (!isOpen)
        return null;
    const getIcon = () => {
        switch (variant) {
            case 'danger':
                return _jsx(FiAlertTriangle, { className: "w-6 h-6 text-red-600" });
            case 'warning':
                return _jsx(FiAlertTriangle, { className: "w-6 h-6 text-yellow-600" });
            case 'info':
                return _jsx(FiInfo, { className: "w-6 h-6 text-blue-600" });
            case 'success':
                return _jsx(FiCheckCircle, { className: "w-6 h-6 text-green-600" });
            default:
                return _jsx(FiAlertTriangle, { className: "w-6 h-6 text-red-600" });
        }
    };
    const getConfirmButtonClass = () => {
        switch (variant) {
            case 'danger':
                return 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white';
            case 'warning':
                return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 text-white';
            case 'info':
                return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white';
            case 'success':
                return 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white';
            default:
                return 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white';
        }
    };
    return (_jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: _jsxs("div", { className: "flex min-h-screen items-center justify-center p-2 sm:p-4", children: [_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 transition-opacity", onClick: onClose }), _jsxs("div", { className: "relative w-full sm:max-w-md bg-white rounded-lg shadow-xl transform transition-all", children: [_jsxs("div", { className: "p-4 sm:p-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [showIcon && getIcon(), _jsx("h3", { className: "text-lg font-semibold text-gray-900", children: title })] }), message && (_jsx("div", { className: "mt-4 text-sm text-gray-600", children: typeof message === 'string' ? _jsx("p", { children: message }) : message }))] }), _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 px-4 sm:px-6 py-4 bg-gray-50 rounded-b-lg", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors", children: cancelText }), _jsx("button", { onClick: onConfirm, className: `px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${getConfirmButtonClass()}`, children: confirmText })] })] })] }) }));
};
export default Dialog;
