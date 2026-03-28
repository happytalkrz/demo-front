import { Consultation } from '../../types/chat';

interface ConsultationListProps {
  consultations: Consultation[];
  onSelect: (index: number) => void;
  selectedIndex: number;
}

const ConsultationList = ({ consultations, onSelect, selectedIndex }: ConsultationListProps) => {
  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium">상담 목록</h3>
        <p className="text-sm text-gray-600 mt-1">총 {consultations.length}건</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1 p-2">
          {consultations.map((consultation, index) => (
            <div
              key={consultation.id}
              className={`cursor-pointer hover:bg-gray-50 p-3 rounded-lg border transition-colors ${
                selectedIndex === index
                  ? 'bg-blue-50 border-blue-200'
                  : 'border-gray-100'
              }`}
              onClick={() => onSelect(index)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    consultation.status === 'completed' ? 'bg-green-500' :
                    consultation.status === 'ongoing' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`} />
                  <p className="text-sm font-medium">{consultation.title}</p>
                </div>
              </div>
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex items-center justify-between">
                  <span>{consultation.date} {consultation.time}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    consultation.status === 'completed' ? 'bg-green-100 text-green-700' :
                    consultation.status === 'ongoing' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {consultation.status === 'completed' ? '완료' :
                     consultation.status === 'ongoing' ? '진행중' : '대기'}
                  </span>
                </div>
                <div>{consultation.counselor}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultationList; 