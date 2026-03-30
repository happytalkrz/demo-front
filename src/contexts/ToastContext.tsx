import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ToastType } from '../types/common';

interface ToastContextType {
  toasts: ToastType[];
  addToast: (toast: Omit<ToastType, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = (toast: Omit<ToastType, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastType = {
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

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};