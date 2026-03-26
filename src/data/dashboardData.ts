import { FiUsers, FiMessageSquare, FiBarChart2, FiCalendar } from 'react-icons/fi';
import { StatCardData, ActivityItem } from '../types/common';

export const statCardsData: StatCardData[] = [
  {
    icon: FiUsers,
    title: '총 사용자',
    value: '2,450',
    change: '+12.5%',
    trend: 'up',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-500'
  },
  {
    icon: FiMessageSquare,
    title: '활성 세션',
    value: '142',
    change: '+5.1%',
    trend: 'up',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-500'
  },
  {
    icon: FiBarChart2,
    title: '오늘 요청',
    value: '1,235',
    change: '-2.3%',
    trend: 'down',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-500'
  },
  {
    icon: FiCalendar,
    title: '전환율',
    value: '84.2%',
    change: '+1.2%',
    trend: 'up',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-500'
  }
];

export const recentActivities: ActivityItem[] = [
  {
    id: 1,
    type: '신규 사용자 등록',
    message: '홍길동님이 새로운 계정을 생성했습니다.',
    description: '홍길동님이 새로운 계정을 생성했습니다.',
    timestamp: '2024-03-26T14:00:00Z',
    time: '2시간 전'
  },
  {
    id: 2,
    type: '문서 업데이트',
    message: '프로젝트 문서가 업데이트 되었습니다.',
    description: '프로젝트 문서가 업데이트 되었습니다.',
    timestamp: '2024-03-26T12:00:00Z',
    time: '4시간 전'
  },
  {
    id: 3,
    type: '시스템 알림',
    message: '서버 유지보수가 예정되어 있습니다.',
    description: '서버 유지보수가 예정되어 있습니다.',
    timestamp: '2024-03-25T16:00:00Z',
    time: '어제'
  },
  {
    id: 4,
    type: '보고서 생성',
    message: '월간 사용자 활동 보고서가 생성되었습니다.',
    description: '월간 사용자 활동 보고서가 생성되었습니다.',
    timestamp: '2024-03-25T10:00:00Z',
    time: '어제'
  },
  {
    id: 5,
    type: '백업 완료',
    message: '데이터베이스 백업이 성공적으로 완료되었습니다.',
    description: '데이터베이스 백업이 성공적으로 완료되었습니다.',
    timestamp: '2024-03-24T20:00:00Z',
    time: '2일 전'
  }
];