import { useToastContext } from '../contexts/ToastContext';

export const useToast = () => {
  const { addToast } = useToastContext();

  const success = (title: string, message?: string) => {
    addToast({ type: 'success', title, message });
  };

  const error = (title: string, message?: string) => {
    addToast({ type: 'error', title, message });
  };

  const info = (title: string, message?: string) => {
    addToast({ type: 'info', title, message });
  };

  const warning = (title: string, message?: string) => {
    addToast({ type: 'warning', title, message });
  };

  return {
    success,
    error,
    info,
    warning,
  };
};