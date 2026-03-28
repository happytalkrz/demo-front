import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FiX, FiCheck, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';
import { useToastContext } from '../../contexts/ToastContext';
const Toast = ({ toast }) => {
    const { removeToast } = useToastContext();
    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return _jsx(FiCheck, { className: "w-5 h-5" });
            case 'error':
                return _jsx(FiAlertCircle, { className: "w-5 h-5" });
            case 'warning':
                return _jsx(FiAlertTriangle, { className: "w-5 h-5" });
            case 'info':
                return _jsx(FiInfo, { className: "w-5 h-5" });
        }
    };
    const getColorClasses = () => {
        switch (toast.type) {
            case 'success':
                return 'bg-green-50 border-green-200 text-green-800';
            case 'error':
                return 'bg-red-50 border-red-200 text-red-800';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800';
            case 'info':
                return 'bg-blue-50 border-blue-200 text-blue-800';
        }
    };
    return (_jsx("div", { className: `rounded-lg border p-4 shadow-lg transition-all ${getColorClasses()}`, children: _jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "flex-shrink-0", children: getIcon() }), _jsxs("div", { className: "ml-3 flex-1", children: [_jsx("p", { className: "font-medium text-sm", children: toast.title }), toast.message && (_jsx("p", { className: "mt-1 text-sm opacity-90", children: toast.message }))] }), _jsx("button", { onClick: () => removeToast(toast.id), className: "ml-4 inline-flex rounded-md p-1.5 hover:opacity-70 transition-opacity", children: _jsx(FiX, { className: "h-4 w-4" }) })] }) }));
};
const ToastContainer = () => {
    const { toasts } = useToastContext();
    if (toasts.length === 0)
        return null;
    return (_jsx("div", { className: "fixed top-4 right-4 z-50 space-y-2", children: toasts.map(toast => (_jsx(Toast, { toast: toast }, toast.id))) }));
};
export { Toast, ToastContainer };
export default Toast;
