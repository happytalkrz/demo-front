export interface User {
  id: number;
  name: string;
  email: string;
  role: '관리자' | '편집자' | '일반 사용자';
  status: '활성' | '비활성' | '휴면';
  lastLogin: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  role: User['role'];
  status: User['status'];
}

export interface UpdateUserData extends CreateUserData {
  id: number;
}