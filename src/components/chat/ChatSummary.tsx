import { ChatSummary as ChatSummaryType, ChatMessage } from '../../types/chat';
import { useState } from 'react';

// API 응답 데이터 타입 정의
interface SummaryResponse {
  code: string | null;
  timestamp: number;
  message: string;
  data: {
    title: string;
    summary: string;
    emotion: string;
  };
}

interface ChatSummaryProps {
  messages: ChatMessage[];
  summary?: ChatSummaryType | null;
}

const ChatSummary = ({ messages, summary }: ChatSummaryProps) => {
  // 기본 요약 섹션 상태
  const [showSummary1, setShowSummary1] = useState(true);
  const [showSummary2, setShowSummary2] = useState(true);
  const [showSummary3, setShowSummary3] = useState(true);

  // API 요약 관련 상태
  const [showApiSummary, setShowApiSummary] = useState(true);
  const [apiSummary, setApiSummary] = useState<SummaryResponse['data'] | null>(null);
  const [summaryTimestamp, setSummaryTimestamp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 타임스탬프를 yyyy.MM.dd HH:mm 형식으로 변환
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes} 기준`;
  };

  // 감정에 맞는 이모티콘 표시
  const getEmotionIcon = (emotion: string): string => {
    switch (emotion.toLowerCase()) {
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

  // 요약 생성 처리
  const handleSummarize = async () => {
    setIsLoading(true);

    // 현재 채팅 메시지를 요청한 JSON 형식으로 준비
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      message: msg.message
    }));

    // 샘플 챗봇 메시지 추가 (요청된 형식에 맞춰)
    const chatbotMessages: ChatMessage[] = [
      { role: "chatbot", message: "빠르고 정확한 상담을 위해 고객님의 프로필을 입력해 주세요?" },
      { role: "chatbot", message: "지금은 상담가능 시간이 아닙니다." }
    ];

    // 모든 메시지를 합치고 챗봇 메시지 추가 (2개는 고정 위치에)
    const allMessages = [...formattedMessages];
    if (allMessages.length >= 3) {
      allMessages.splice(1, 0, chatbotMessages[0]);
      if (allMessages.length >= 10) {
        allMessages.splice(10, 0, chatbotMessages[1]);
      }
    }

    const requestBody = {
      id: 500, // 테스트용 고정 ID
      messages: allMessages
    };

    console.log(JSON.stringify(requestBody, null, 2));

    try {
      // API 호출
      const response = await fetch('http://localhost:8080/inference/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data: SummaryResponse = await response.json();
        console.log('API 응답:', data);

        // 응답 데이터 저장
        setApiSummary(data.data);
        setSummaryTimestamp(formatTimestamp(data.timestamp));
      } else {
        console.error('API 요청 실패:', response.statusText);
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
    } finally {
      // 로딩 상태 비활성화
      setIsLoading(false);
    }
  };

  const toggleSummary = (summaryId: number) => {
    if (summaryId === 1) setShowSummary1(!showSummary1);
    else if (summaryId === 2) setShowSummary2(!showSummary2);
    else if (summaryId === 3) setShowSummary3(!showSummary3);
    else if (summaryId === 4) setShowApiSummary(!showApiSummary);
  };

  return (
    <div className="w-full bg-white border-l border-gray-200 flex flex-col h-full">
      <div className="p-3 border-b border-gray-200 flex items-center">
        <div className="flex items-center justify-center w-5 h-5 rounded border border-gray-300 mr-2">
          <span className="text-xs">✕</span>
        </div>
        <span className="font-medium">h.AI Assistant 상담 요약</span>
      </div>

      <div className="p-4 overflow-y-auto flex-1">
        <div className="text-xs text-gray-500 mb-2">AI가 처리하여 상담 내용을 자동해 생성합니다.</div>

        <div className="mb-4">
          <div className="text-sm font-medium">상담 개요</div>
          <div className="text-xs text-gray-600 mt-1">
            {summary ? summary.content.mainIssue : "AI가 등록 개요를 GOT 기반으로 정리했습니다. 원격 작대에 실딥 표현과 일치할 수도있으나 등 참고시 활용해 주세요."}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-2 mt-4 mb-4">
          <div className="flex justify-between items-center mb-1 cursor-pointer" onClick={() => toggleSummary(1)}>
            <div className="text-sm font-medium">상담 세부 요약</div>
            <div className="text-xs text-gray-500">2023.05.07 11:03 기준</div>
          </div>
          {showSummary1 && (
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

        <div className="border-t border-gray-200 pt-2 mb-4">
          <div className="flex justify-between items-center mb-1 cursor-pointer" onClick={() => toggleSummary(2)}>
            <div className="text-sm font-medium">상담 핵심 1</div>
            <div className="text-xs text-gray-500">2023.05.07 11:03 기준</div>
          </div>
          {showSummary2 && (
            <div className="text-xs text-gray-600 pl-2 border-l-2 border-gray-200 ml-1 py-1">
              고객: 내용 대화 기록에 없는 곳이<br/>
              상담사: 제품 정보 안내시 지식 인가<br/>
              고객 기타: 보험
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-2 mb-4">
          <div className="flex justify-between items-center mb-1 cursor-pointer" onClick={() => toggleSummary(3)}>
            <div className="text-sm font-medium">상담 핵심 2</div>
            <div className="text-xs text-gray-500">2023.05.07 11:03 기준</div>
          </div>
          {showSummary3 && (
            <div className="text-xs text-gray-600 pl-2 border-l-2 border-gray-200 ml-1 py-1">
              고객: 내용 대화 기록에 없는 곳이<br/>
              상담사: 제품 정보 안내시 지식 인가<br/>
              고객 기타: 보험
            </div>
          )}
        </div>

        {/* API 요약 섹션 - 로딩 중이거나 응답이 있을 때 표시 */}
        {(isLoading || apiSummary) && (
          <div className="border-t border-gray-200 pt-2 mb-4">
            <div className="flex justify-between items-center mb-1 cursor-pointer" onClick={() => toggleSummary(4)}>
              <div className="text-sm font-medium flex items-center">
                <span>상담핵심</span>
                {!isLoading && apiSummary && <span className="ml-2 text-xl">{getEmotionIcon(apiSummary.emotion)}</span>}
              </div>
              <div className="text-xs text-gray-500">
                {isLoading ? '생성 중...' : summaryTimestamp}
              </div>
            </div>
            {showApiSummary && (
              <div className="text-xs text-gray-600 pl-2 border-l-2 border-gray-200 ml-1 py-1">
                {isLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                      <div className="mt-3 text-sm text-gray-500">상담 요약 중...</div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-1"><strong>제목:</strong> {apiSummary?.title}</div>
                    <div className="mb-1"><strong>요약내용:</strong> {apiSummary?.summary}</div>
                    <div><strong>감정:</strong> {apiSummary?.emotion}</div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleSummarize}
          disabled={isLoading}
          className={`w-full py-3 text-white text-sm font-medium rounded ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'}`}
        >
          {isLoading ? '상담내용 요약 중...' : '현재까지 상담내용 요약하기'}
        </button>
      </div>
    </div>
  );
};

export default ChatSummary; 