import { Consultation } from '../../types/chat';

interface ConsultationListProps {
  consultations: Consultation[];
  selectedId?: string;
  onSelect?: (consultation: Consultation) => void;
}

const ConsultationList = ({ consultations, selectedId, onSelect }: ConsultationListProps) => {
  const statusConfig = {
    waiting: { badge: 'bg-yellow-100 text-yellow-800', text: '대기' },
    in_progress: { badge: 'bg-blue-100 text-blue-800', text: '진행중' },
    completed: { badge: 'bg-green-100 text-green-800', text: '완료' },
    cancelled: { badge: 'bg-gray-100 text-gray-800', text: '취소' }
  };

  const priorityConfig = {
    high: { border: 'border-l-red-400', bg: 'bg-red-400' },
    medium: { border: 'border-l-yellow-400', bg: 'bg-yellow-400' },
    low: { border: 'border-l-green-400', bg: 'bg-green-400' }
  };

  const getStatusBadge = (status: Consultation['status']) => {
    const config = statusConfig[status] || statusConfig.cancelled;
    return `px-2 py-1 text-xs rounded-full font-medium ${config.badge}`;
  };

  const getStatusText = (status: Consultation['status']) => {
    return statusConfig[status]?.text ?? '알 수 없음';
  };

  const getPriorityConfig = (priority: Consultation['priority']) => {
    return priorityConfig[priority] || priorityConfig.low;
  };

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
        {consultations.map((consultation) => {
          const priorityConfig = getPriorityConfig(consultation.priority);
          return (
            <div
              key={consultation.id}
              className={`
                border-b border-gray-200 pb-3 cursor-pointer p-3 rounded-lg border-l-4 transition-colors
                ${selectedId === consultation.id
                  ? 'bg-blue-50 border-blue-200 shadow-sm'
                  : 'hover:bg-gray-50'
                }
                ${priorityConfig.border}
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
                  <div className={`w-2 h-2 rounded-full ${priorityConfig.bg}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConsultationList; 