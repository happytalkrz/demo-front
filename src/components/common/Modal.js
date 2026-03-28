import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
const Modal = ({ isOpen, onClose, title, children, size = 'md', showCloseButton = true }) => {
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
    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };
    return (_jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: _jsxs("div", { className: "flex min-h-screen items-center justify-center p-4", children: [_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 transition-opacity", onClick: onClose }), _jsxs("div", { className: `relative w-full ${sizeClasses[size]} bg-white rounded-lg shadow-xl transform transition-all`, children: [(title || showCloseButton) && (_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-200", children: [title && _jsx("h3", { className: "text-lg font-semibold text-gray-900", children: title }), showCloseButton && (_jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600 transition-colors", children: _jsx(FiX, { className: "w-6 h-6" }) }))] })), _jsx("div", { className: "p-6", children: children })] })] }) }));
};
export default Modal;
