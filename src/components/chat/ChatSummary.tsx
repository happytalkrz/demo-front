import { ChatSummary as ChatSummaryType } from '../../types/chat';
import { useState } from 'react';

interface ChatSummaryProps {
  summary: ChatSummaryType | null;
  onSummarize: () => void;
}

const ChatSummary = ({ summary, onSummarize }: ChatSummaryProps) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-white rounded p-2 mb-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded mr-2">
            <span className="text-xs">✕</span>
          </div>
          <h3 className="text-base font-medium">h.AI Assistant 상담 요약</h3>
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-2">
        AI가 처리하여 상담 내용을 자동해 생성합니다.
      </div>

      <div className="mb-3">
        <div className="text-sm font-medium">상담 개요</div>
        <div className="text-xs text-gray-600 mt-1">
          {summary ? summary.content.mainIssue : "AI가 등록 개요를 GOT 기반으로 정리했습니다. 원격 작대에 실딥 표현과 일치할 수도있으나 등 참고시 활용해 주세요."}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-2 mb-3">
        <div className="flex justify-between items-center mb-1 cursor-pointer" onClick={toggleExpand}>
          <div className="text-sm font-medium">상담 세부 요약</div>
          <div className="text-xs text-gray-500">2023.05.07 11:03 기준</div>
        </div>
        {expanded && (
          <div className="text-xs text-gray-600 pl-2 border-l-2 border-gray-200 ml-1 py-1">
            {summary ? (
              <>
                문의 내용: {summary.content.mainIssue}<br/>
                상담 결과: {summary.content.result}<br/>
                후속 조치: {summary.content.nextAction}
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

      <button
        onClick={onSummarize}
        className="w-full py-2 bg-black text-white text-sm font-medium rounded"
      >
        현재까지 상담내용 요약하기
      </button>
    </div>
  );
};

export default ChatSummary; 