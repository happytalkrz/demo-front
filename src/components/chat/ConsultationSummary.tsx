interface ConsultationSummaryData {
  title: string;
  summary: string;
  emotion: string;
  timestamp: string;
}

interface ConsultationSummaryProps {
  data: ConsultationSummaryData | null;
  isLoading: boolean;
  onGenerate: () => void;
  isExpanded: boolean;
  onToggle: () => void;
}

const ConsultationSummary = ({
  data,
  isLoading,
  onGenerate,
  isExpanded,
  onToggle
}: ConsultationSummaryProps) => {
  // 감정에 맞는 이모티콘 표시
  const getEmotionIcon = (emotion: string): string => {
    switch (emotion?.toLowerCase()) {
      case '긍정':
        return '😊';
      case '부정':
        return '😞';
      case '중립':
        return '😐';
      default:
        return '❓';
    }
  };

  return (
    <div className="border-t border-gray-200 pt-4 mb-4">
      <div
        className="flex justify-between items-center mb-2 cursor-pointer"
        onClick={onToggle}
      >
        <div className="text-sm font-medium flex items-center">
          <span>AI 상담 요약</span>
          {!isLoading && data && (
            <span className="ml-2 text-xl">{getEmotionIcon(data.emotion)}</span>
          )}
        </div>
        <div className="text-xs text-gray-500">
          {isLoading ? '생성 중...' : (data?.timestamp || '')}
        </div>
      </div>

      {isExpanded && (
        <div className="text-xs text-gray-600 pl-2 border-l-2 border-blue-200 ml-1 py-2 bg-blue-50 rounded">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-pulse flex flex-col items-center w-full">
                <div className="h-3 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-5/6 bg-gray-200 rounded mb-4"></div>
                <div className="text-sm text-gray-500">AI가 상담 내용을 분석 중...</div>
              </div>
            </div>
          ) : data ? (
            <>
              <div className="mb-2">
                <span className="font-medium text-gray-800">제목:</span>
                <span className="ml-1">{data.title}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium text-gray-800">요약:</span>
                <span className="ml-1">{data.summary}</span>
              </div>
              <div>
                <span className="font-medium text-gray-800">감정 분석:</span>
                <span className="ml-1">{data.emotion}</span>
                <span className="ml-1">{getEmotionIcon(data.emotion)}</span>
              </div>
            </>
          ) : (
            <div className="text-center py-4 text-gray-500">
              아직 생성된 요약이 없습니다.
            </div>
          )}
        </div>
      )}

      <button
        onClick={onGenerate}
        disabled={isLoading}
        className={`w-full mt-3 py-2 text-white text-sm font-medium rounded transition-colors ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
        }`}
      >
        {isLoading ? '상담내용 분석 중...' : '현재까지 상담내용 요약하기'}
      </button>
    </div>
  );
};

export default ConsultationSummary;