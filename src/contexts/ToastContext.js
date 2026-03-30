import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const ToastContext = createContext(undefined);
export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToastContext must be used within a ToastProvider');
    }
    return context;
};
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const addToast = (toast) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast = {
            ...toast,
            id,
            duration: toast.duration || 3000,
        };
        setToasts(prev => [...prev, newToast]);
        // Auto remove after duration
        setTimeout(() => {
            removeToast(id);
        }, newToast.duration);
    };
    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };
    return (_jsx(ToastContext.Provider, { value: { toasts, addToast, removeToast }, children: children }));
};
