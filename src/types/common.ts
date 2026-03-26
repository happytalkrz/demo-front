export interface TableColumn<T = any> {
  key: keyof T;
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

// Dashboard 관련 타입
export interface StatCardData {
  icon: React.ComponentType<any>;
  title: string;
  value: string;
  bgColor: string;
  iconColor: string;
}

export interface ActivityItem {
  id: number;
  type: string;
  description: string;
  time: string;
}