import { FiX, FiCheck, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';
import { ToastType } from '../../types/common';
import { useToastContext } from '../../contexts/ToastContext';

interface ToastProps {
  toast: ToastType;
}

const Toast = ({ toast }: ToastProps) => {
  const { removeToast } = useToastContext();

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <FiCheck className="w-5 h-5" />;
      case 'error':
        return <FiAlertCircle className="w-5 h-5" />;
      case 'warning':
        return <FiAlertTriangle className="w-5 h-5" />;
      case 'info':
        return <FiInfo className="w-5 h-5" />;
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

  return (
    <div className={`rounded-lg border p-4 shadow-lg transition-all ${getColorClasses()}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          <p className="font-medium text-sm">{toast.title}</p>
          {toast.message && (
            <p className="mt-1 text-sm opacity-90">{toast.message}</p>
          )}
        </div>
        <button
          onClick={() => removeToast(toast.id)}
          className="ml-4 inline-flex rounded-md p-1.5 hover:opacity-70 transition-opacity"
        >
          <FiX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const ToastContainer = () => {
  const { toasts } = useToastContext();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export { Toast, ToastContainer };
export default Toast;