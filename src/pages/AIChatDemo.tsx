import { useState } from 'react';
import ChatList from '../components/chat/ChatList';
import ChatInput from '../components/chat/ChatInput';
import ChatSelector from '../components/chat/ChatSelector';
import ConsultationSummary from '../components/chat/ConsultationSummary';
import { chatData } from '../data/chatData';
import { ChatMessage } from '../types/chat';

// 응답 데이터 타입 정의
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

const AIChatDemo = () => {
  // 채팅 관련 상태
  const [selectedChatIndex, setSelectedChatIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>(chatData[0].dialogue);
  const [role, setRole] = useState<'customer' | 'counselor'>('customer');
  
  // 요약 관련 상태
  const [apiSummary, setApiSummary] = useState<SummaryResponse['data'] | null>(null);
  const [summaryTimestamp, setSummaryTimestamp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSummaryExpanded, setShowSummaryExpanded] = useState(true);
  
  // 채팅 데이터 변경 처리
  const handleChatSelect = (index: number) => {
    setSelectedChatIndex(index);
    setMessages(chatData[index].dialogue);
  };
  
  // 메시지 전송 처리
  const handleSendMessage = (message: string, selectedRole: 'customer' | 'counselor') => {
    const newMessage: ChatMessage = {
      role: selectedRole,
      message
    };
    setMessages([...messages, newMessage]);
  };

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

  // 요약 생성 처리
  const handleSummarize = async () => {
    setIsLoading(true);

    // 현재 채팅 메시지를 요청한 JSON 형식으로 준비
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      message: msg.message
    }));

    const requestBody = {
      id: 500, // 테스트용 고정 ID
      messages: formattedMessages
    };

    try {
      // API 호출 (실제 환경에서는 실제 API 엔드포인트 사용)
      const response = await fetch('http://localhost:8080/inference/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data: SummaryResponse = await response.json();
        setApiSummary(data.data);
        setSummaryTimestamp(formatTimestamp(data.timestamp));
      } else {
        // API 실패 시 목업 데이터 사용
        const mockData = {
          title: '상담 내용 요약',
          summary: '고객의 문의사항에 대해 상담사가 친절하게 답변하였으며, 문제가 원만히 해결되었습니다.',
          emotion: '긍정'
        };
        setApiSummary(mockData);
        setSummaryTimestamp(formatTimestamp(Date.now() / 1000));
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
      // 오류 시 목업 데이터 사용
      const mockData = {
        title: '상담 내용 요약',
        summary: '고객의 문의사항에 대해 상담사가 친절하게 답변하였으며, 문제가 원만히 해결되었습니다.',
        emotion: '중립'
      };
      setApiSummary(mockData);
      setSummaryTimestamp(formatTimestamp(Date.now() / 1000));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 채팅 영역 */}
      <div className="w-1/2 flex flex-col bg-white h-[calc(100vh-50px)]">
        <div className="p-3 border-b border-gray-200 flex items-center">
          <div className="flex items-center">
            <span className="text-sm">Tag</span>
            <span className="ml-2 text-sm font-medium">memo</span>
          </div>
          <div className="ml-auto flex space-x-1">
            <button className="w-5 h-5 flex items-center justify-center rounded border border-gray-300">
              <span className="text-xs">✕</span>
            </button>
            <button className="w-5 h-5 flex items-center justify-center rounded border border-gray-300">
              <span className="text-xs">□</span>
            </button>
            <button className="w-5 h-5 flex items-center justify-center rounded border border-gray-300">
              <span className="text-xs">◇</span>
            </button>
            <button className="w-5 h-5 flex items-center justify-center rounded border border-gray-300">
              <span className="text-xs">○</span>
            </button>
          </div>
        </div>

        <div className="p-3 border-b border-gray-200">
          <ChatSelector
            chatData={chatData}
            onSelect={handleChatSelect}
            selectedIndex={selectedChatIndex}
          />
        </div>

        <div className="flex flex-col overflow-y-auto p-2 bg-gray-50">
          <ChatList messages={messages} />
        </div>

        <ChatInput
          onSendMessage={handleSendMessage}
          selectedRole={role}
          onRoleChange={setRole}
        />
      </div>

      {/* 우측 상담 요약 영역 */}
      <div className="w-1/2 bg-white border-l border-gray-200 flex flex-col h-[calc(100vh-50px)]">
        <div className="p-4 border-b border-gray-200 flex items-center">
          <div className="flex items-center justify-center w-6 h-6 rounded border border-gray-300 mr-3">
            <span className="text-xs">✕</span>
          </div>
          <h2 className="font-semibold text-gray-800">h.AI Assistant 상담 요약</h2>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          <div className="text-xs text-gray-500 mb-4 p-3 bg-gray-50 rounded-lg">
            AI가 상담 내용을 분석하여 핵심 정보를 자동으로 요약합니다.
            참고용으로 활용해 주세요.
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-800 mb-2">상담 개요</h3>
            <div className="text-xs text-gray-600 p-3 bg-blue-50 border border-blue-200 rounded">
              현재 선택된 상담: <span className="font-medium">{chatData[selectedChatIndex]?.title}</span>
              <br />
              총 메시지 수: {messages.length}개
            </div>
          </div>

          <ConsultationSummary
            data={apiSummary ? {
              title: apiSummary.title,
              summary: apiSummary.summary,
              emotion: apiSummary.emotion,
              timestamp: summaryTimestamp
            } : null}
            isLoading={isLoading}
            onGenerate={handleSummarize}
            isExpanded={showSummaryExpanded}
            onToggle={() => setShowSummaryExpanded(!showSummaryExpanded)}
          />
        </div>
      </div>
    </div>
  );
};

export default AIChatDemo;