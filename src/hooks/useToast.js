import { useToastContext } from '../contexts/ToastContext';
export const useToast = () => {
    const { addToast } = useToastContext();
    const success = (title, message) => {
        addToast({ type: 'success', title, message });
    };
    const error = (title, message) => {
        addToast({ type: 'error', title, message });
    };
    const info = (title, message) => {
        addToast({ type: 'info', title, message });
    };
    const warning = (title, message) => {
        addToast({ type: 'warning', title, message });
    };
    return {
        success,
        error,
        info,
        warning,
    };
};
