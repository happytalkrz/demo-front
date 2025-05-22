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
  
  // 요약 영역 표시 상태
  const [showSummary1, setShowSummary1] = useState(true);
  const [showSummary2, setShowSummary2] = useState(true);
  const [showSummary3, setShowSummary3] = useState(true);
  const [showSummary4, setShowSummary4] = useState(true);
  
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

  const toggleSummary = (summaryId: number) => {
    if (summaryId === 1) setShowSummary1(!showSummary1);
    else if (summaryId === 2) setShowSummary2(!showSummary2);
    else if (summaryId === 3) setShowSummary3(!showSummary3);
    else if (summaryId === 4) setShowSummary4(!showSummary4);
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
      <div className="w-1/2 bg-white border-l border-gray-200 flex flex-col h-[calc(100vh-50px)]">
        <div className="p-3 border-b border-gray-200 flex items-center">
          <div className="flex items-center justify-center w-5 h-5 rounded border border-gray-300 mr-2">
            <span className="text-xs">✕</span>
          </div>
          <span className="font-medium">h.AI Assistant 상담 요약</span>
        </div>

        <div className="p-4 overflow-y-auto">
          <div className="text-xs text-gray-500 mb-2">AI가 처리하여 상담 내용을 자동해 생성합니다.</div>
          
          <div className="mb-4">
            <div className="text-sm font-medium">상담 개요</div>
            <div className="text-xs text-gray-600 mt-1">
              AI가 등록 개요를 GOT 기반으로 정리했습니다. 원격 작대에 실딥 표현과 일치할 
              수도있으나 등 참고시 활용해 주세요.
            </div>
          </div>

          <div className="border-t border-gray-200 pt-2 mt-4 mb-4">
            <div className="flex justify-between items-center mb-1 cursor-pointer" onClick={() => toggleSummary(1)}>
              <div className="text-sm font-medium">상담 세부 요약</div>
              <div className="text-xs text-gray-500">2023.05.07 11:03 기준</div>
            </div>
            {showSummary1 && (
              <div className="text-xs text-gray-600 pl-2 border-l-2 border-gray-200 ml-1 py-1">
                고객: 내용 대화 기록에 없는 곳이<br/>
                상담사: 제품 정보 안내시 지식 인가<br/>
                고객 기타: 보험
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

          {/* 로딩 중이거나 응답이 있을 때 표시 */}
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
              {showSummary4 && (
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
    </div>
  );
};

export default AIChatDemo;