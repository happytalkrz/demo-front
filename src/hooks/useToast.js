import { useCallback } from 'react';
import { useToastContext } from '../contexts/ToastContext';

export const useToast = () => {
    const { addToast } = useToastContext();

    const success = useCallback((title, message) => addToast({ type: 'success', title, message }), [addToast]);
    const error = useCallback((title, message) => addToast({ type: 'error', title, message }), [addToast]);
    const info = useCallback((title, message) => addToast({ type: 'info', title, message }), [addToast]);
    const warning = useCallback((title, message) => addToast({ type: 'warning', title, message }), [addToast]);

    return { success, error, info, warning };
};
