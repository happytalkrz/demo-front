import { useState } from 'react';
import ChatList from '../components/chat/ChatList';
import ChatInput from '../components/chat/ChatInput';
import ChatSummary from '../components/chat/ChatSummary';
import ConsultationList from '../components/chat/ConsultationList';
import { chatData, consultations } from '../data/chatData';
import { mockSummaries } from '../data/summaryData';
import { ChatMessage, ChatSummary as ChatSummaryType, Consultation } from '../types/chat';

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
  // 상담 관련 상태
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation>(consultations[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(
    consultations[0].chatDataIndex >= 0 ? chatData[consultations[0].chatDataIndex].dialogue : []
  );
  const [role, setRole] = useState<'customer' | 'counselor'>('customer');
  
  // 요약 관련 상태
  const [summary, setSummary] = useState<ChatSummaryType | null>(null);
  const [summaryCount, setSummaryCount] = useState(0);
  const [lastSummaryMessages, setLastSummaryMessages] = useState<ChatMessage[]>([]);
  const [apiSummary, setApiSummary] = useState<SummaryResponse['data'] | null>(null);
  const [summaryTimestamp, setSummaryTimestamp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  

  // 상담 선택 처리
  const handleConsultationSelect = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    if (consultation.chatDataIndex >= 0) {
      setMessages(chatData[consultation.chatDataIndex].dialogue);
    } else {
      setMessages([]); // 아직 채팅 데이터가 없는 상담
    }
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
    // 로딩 상태 활성화
    setIsLoading(true);
    const newCount = summaryCount + 1;
    setSummaryCount(newCount);
    
    // 현재 채팅 메시지를 요청한 JSON 형식으로 준비
    const formattedMessages = messages.map(msg => {
      return {
        role: msg.role,
        message: msg.message
      };
    });
    
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
        
        // 현재 메시지 저장
        setLastSummaryMessages([...messages]);
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


  return (
    <div className="flex h-screen bg-gray-100">
      {/* 좌측 상담 목록 영역 */}
      <div className="w-1/4 bg-white border-r border-gray-200 h-[calc(100vh-50px)] overflow-y-auto">
        <ConsultationList
          consultations={consultations}
          selectedId={selectedConsultation.id}
          onSelect={handleConsultationSelect}
        />
      </div>

      {/* 중앙 채팅 영역 */}
      <div className="w-2/4 flex flex-col bg-white h-[calc(100vh-50px)]">
        <div className="p-3 border-b border-gray-200 flex items-center">
          <div className="flex items-center">
            <span className="text-sm">Tag</span>
            <span className="ml-2 text-sm font-medium">{selectedConsultation.category}</span>
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
          <div className="text-sm text-gray-600">
            <span className="font-medium">{selectedConsultation.customerName}</span> 고객님의 상담
          </div>
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
      <div className="w-1/4 bg-gray-50 border-l border-gray-200 flex flex-col h-[calc(100vh-50px)]">
        <div className="p-4 overflow-y-auto">
          <ChatSummary
            summary={summary}
            onSummarize={handleSummarize}
            isLoading={isLoading}
            apiSummary={apiSummary}
            summaryTimestamp={summaryTimestamp}
          />
        </div>
      </div>
    </div>
  );
};

export default AIChatDemo;