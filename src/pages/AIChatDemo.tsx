import { useState } from 'react';
import ChatList from '../components/chat/ChatList';
import ChatInput from '../components/chat/ChatInput';
import ChatSummary from '../components/chat/ChatSummary';
import ChatSelector from '../components/chat/ChatSelector';
import { chatData } from '../data/chatData';
import { mockSummaries } from '../data/summaryData';
import { ChatMessage, ChatSummary as ChatSummaryType } from '../types/chat';

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
  const [summary, setSummary] = useState<ChatSummaryType | null>(null);
  const [summaryCount, setSummaryCount] = useState(0);
  const [lastSummaryMessages, setLastSummaryMessages] = useState<ChatMessage[]>([]);
  const [apiSummary, setApiSummary] = useState<SummaryResponse['data'] | null>(null);
  const [summaryTimestamp, setSummaryTimestamp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  
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

  // 마지막 요약의 첫 세 메시지 가져오기 (새 탭에서 보여줄 내용)
  const getLastThreeMessages = () => {
    if (lastSummaryMessages.length === 0) return "요약 내용이 없습니다.";

    return lastSummaryMessages.slice(0, Math.min(3, lastSummaryMessages.length)).map((msg, idx) => (
      <div key={idx} className="mb-1">
        <span className="font-medium">{msg.role === 'customer' ? '고객' : '상담사'}:</span> {msg.message.length > 50 ? `${msg.message.substring(0, 50)}...` : msg.message}
      </div>
    ));
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
      <div className="w-1/2 bg-gray-50 border-l border-gray-200 flex flex-col h-[calc(100vh-50px)]">
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