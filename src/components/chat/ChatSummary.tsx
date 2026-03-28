import { ChatSummary as ChatSummaryType } from '../../types/chat';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

// API 응답 데이터 타입
interface ApiSummaryData {
  title: string;
  summary: string;
  emotion: string;
}

interface ChatSummaryProps {
  summary: ChatSummaryType | null;
  onSummarize: () => void;
  isLoading?: boolean;
  apiSummary?: ApiSummaryData | null;
  summaryTimestamp?: string;
}

const ChatSummary = ({
  summary,
  onSummarize,
  isLoading = false,
  apiSummary = null,
  summaryTimestamp = ''
}: ChatSummaryProps) => {
  const [expanded, setExpanded] = useState([true, true, true, true]);

  const toggleSection = (index: number) => {
    setExpanded(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const emotionIcons: Record<string, string> = {
    '긍정': '😊',
    '부정': '😞',
    '중립': '😐'
  };

  const getEmotionIcon = (emotion: string) => emotionIcons[emotion.toLowerCase()] ?? '❓';

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-5 h-5 rounded border border-gray-300 mr-2">
            <span className="text-xs">✕</span>
          </div>
          <h3 className="text-base font-medium text-gray-900">h.AI Assistant 상담 요약</h3>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          AI가 처리하여 상담 내용을 자동해 생성합니다.
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <div className="text-sm font-medium text-gray-900 mb-2">상담 개요</div>
          <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
            {summary ?
              summary.content.mainIssue :
              "AI가 등록 개요를 GOT 기반으로 정리했습니다. 원격 작대에 실딥 표현과 일치할 수도있으나 등 참고시 활용해 주세요."
            }
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
               onClick={() => toggleSection(0)}>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-900">상담 세부 요약</span>
              {expanded[0] ? <FiChevronUp className="ml-2 w-4 h-4" /> : <FiChevronDown className="ml-2 w-4 h-4" />}
            </div>
            <div className="text-xs text-gray-500">2023.05.07 11:03 기준</div>
          </div>
          {expanded[0] && (
            <div className="text-xs text-gray-600 pl-2 border-l-2 border-blue-200 ml-1 py-2 bg-blue-50 rounded-r">
              {summary ? (
                <>
                  <div className="mb-1"><strong>문의 내용:</strong> {summary.content.mainIssue}</div>
                  <div className="mb-1"><strong>상담 결과:</strong> {summary.content.result}</div>
                  <div><strong>후속 조치:</strong> {summary.content.nextAction}</div>
                </>
              ) : (
                <>
                  고객: 내용 대화 기록에 없는 곳이<br/>
                  상담사: 제품 정보 안내시 지식 인가<br/>
                  고객 기타: 보험
                </>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
               onClick={() => toggleSection(1)}>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-900">상담 핵심 1</span>
              {expanded[1] ? <FiChevronUp className="ml-2 w-4 h-4" /> : <FiChevronDown className="ml-2 w-4 h-4" />}
            </div>
            <div className="text-xs text-gray-500">2023.05.07 11:03 기준</div>
          </div>
          {expanded[1] && (
            <div className="text-xs text-gray-600 pl-2 border-l-2 border-green-200 ml-1 py-2 bg-green-50 rounded-r">
              고객: 내용 대화 기록에 없는 곳이<br/>
              상담사: 제품 정보 안내시 지식 인가<br/>
              고객 기타: 보험
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
               onClick={() => toggleSection(2)}>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-900">상담 핵심 2</span>
              {expanded[2] ? <FiChevronUp className="ml-2 w-4 h-4" /> : <FiChevronDown className="ml-2 w-4 h-4" />}
            </div>
            <div className="text-xs text-gray-500">2023.05.07 11:03 기준</div>
          </div>
          {expanded[2] && (
            <div className="text-xs text-gray-600 pl-2 border-l-2 border-yellow-200 ml-1 py-2 bg-yellow-50 rounded-r">
              고객: 내용 대화 기록에 없는 곳이<br/>
              상담사: 제품 정보 안내시 지식 인가<br/>
              고객 기타: 보험
            </div>
          )}
        </div>

        {(isLoading || apiSummary) && (
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                 onClick={() => toggleSection(3)}>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">상담핵심</span>
                {!isLoading && apiSummary && (
                  <span className="ml-2 text-xl">{getEmotionIcon(apiSummary.emotion)}</span>
                )}
                {expanded[3] ? <FiChevronUp className="ml-2 w-4 h-4" /> : <FiChevronDown className="ml-2 w-4 h-4" />}
              </div>
              <div className="text-xs text-gray-500">
                {isLoading ? '생성 중...' : summaryTimestamp}
              </div>
            </div>
            {expanded[3] && (
              <div className="text-xs text-gray-600 pl-2 border-l-2 border-purple-200 ml-1 py-2 bg-purple-50 rounded-r">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-pulse flex flex-col items-center w-full">
                      <div className="h-3 w-3/4 bg-gray-200 rounded mb-3"></div>
                      <div className="h-3 w-full bg-gray-200 rounded mb-3"></div>
                      <div className="h-3 w-5/6 bg-gray-200 rounded mb-4"></div>
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                        <span className="text-sm text-purple-600 font-medium">상담 요약 중...</span>
                      </div>
                    </div>
                  </div>
                ) : apiSummary ? (
                  <>
                    <div className="mb-2"><strong>제목:</strong> {apiSummary.title}</div>
                    <div className="mb-2"><strong>요약내용:</strong> {apiSummary.summary}</div>
                    <div><strong>감정:</strong> {apiSummary.emotion}</div>
                  </>
                ) : null}
              </div>
            )}
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={onSummarize}
            disabled={isLoading}
            className={`w-full py-3 text-white text-sm font-medium rounded-lg transition-colors ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
            }`}
          >
            {isLoading ? '상담내용 요약 중...' : '현재까지 상담내용 요약하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSummary; 