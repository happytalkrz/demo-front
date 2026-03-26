import { User } from '../types/user';

export const initialUsers: User[] = [
  { id: 1, name: '김영희', email: 'kim@example.com', role: '관리자', status: '활성', lastLogin: '2023-10-15 08:45' },
  { id: 2, name: '이철수', email: 'lee@example.com', role: '일반 사용자', status: '활성', lastLogin: '2023-10-14 14:20' },
  { id: 3, name: '박지민', email: 'park@example.com', role: '일반 사용자', status: '휴면', lastLogin: '2023-09-30 10:15' },
  { id: 4, name: '최동민', email: 'choi@example.com', role: '편집자', status: '활성', lastLogin: '2023-10-15 09:30' },
  { id: 5, name: '정수연', email: 'jung@example.com', role: '일반 사용자', status: '활성', lastLogin: '2023-10-12 16:45' },
  { id: 6, name: '강민준', email: 'kang@example.com', role: '일반 사용자', status: '비활성', lastLogin: '2023-08-25 11:20' },
  { id: 7, name: '윤서연', email: 'yoon@example.com', role: '편집자', status: '활성', lastLogin: '2023-10-14 13:10' },
];

export const roleOptions = [
  { value: '관리자', label: '관리자' },
  { value: '편집자', label: '편집자' },
  { value: '일반 사용자', label: '일반 사용자' },
];

export const statusOptions = [
  { value: '활성', label: '활성' },
  { value: '비활성', label: '비활성' },
  { value: '휴면', label: '휴면' },
];