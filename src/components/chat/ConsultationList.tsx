import { Consultation } from '../../types/chat';

interface ConsultationListProps {
  consultations: Consultation[];
  selectedId?: string;
  onSelect?: (consultation: Consultation) => void;
}

const ConsultationList = ({ consultations, selectedId, onSelect }: ConsultationListProps) => {
  // 상태별 배지 스타일
  const getStatusBadge = (status: Consultation['status']) => {
    const baseClasses = "px-2 py-1 text-xs rounded-full font-medium";

    switch (status) {
      case 'waiting':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'in_progress':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'cancelled':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  // 상태별 텍스트
  const getStatusText = (status: Consultation['status']) => {
    switch (status) {
      case 'waiting':
        return '대기';
      case 'in_progress':
        return '진행중';
      case 'completed':
        return '완료';
      case 'cancelled':
        return '취소';
      default:
        return '알 수 없음';
    }
  };

  // 우선순위별 색상
  const getPriorityColor = (priority: Consultation['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-400';
      case 'medium':
        return 'border-l-yellow-400';
      case 'low':
        return 'border-l-green-400';
      default:
        return 'border-l-gray-400';
    }
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${month}/${day} ${hours}:${minutes}`;
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">상담 목록</h3>
      <div className="space-y-3">
        {consultations.map((consultation) => (
          <div
            key={consultation.id}
            className={`
              border-b border-gray-200 pb-3 cursor-pointer p-3 rounded-lg border-l-4 transition-colors
              ${selectedId === consultation.id
                ? 'bg-blue-50 border-blue-200 shadow-sm'
                : 'hover:bg-gray-50'
              }
              ${getPriorityColor(consultation.priority)}
            `}
            onClick={() => onSelect?.(consultation)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-gray-900">{consultation.customerName}</p>
                  <span className={getStatusBadge(consultation.status)}>
                    {getStatusText(consultation.status)}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-1">{consultation.category}</p>

                <div className="text-xs text-gray-500">
                  {formatDate(consultation.consultationDate)}
                </div>

                {consultation.summary && (
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                    {consultation.summary}
                  </p>
                )}
              </div>

              <div className="flex items-center ml-2">
                <div className={`w-2 h-2 rounded-full ${
                  consultation.priority === 'high' ? 'bg-red-400' :
                  consultation.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultationList; 