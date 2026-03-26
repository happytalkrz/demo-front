export interface TableColumn<T = any> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface ToastType {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface StatCardData {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon?: any;
  bgColor?: string;
  iconColor?: string;
}

export interface ActivityItem {
  id: string | number;
  type: string;
  message: string;
  description?: string;
  timestamp: string;
  time?: string;
  user?: string;
}
