import { useState } from 'react';
import ChatList from '../components/chat/ChatList';
import ChatInput from '../components/chat/ChatInput';
import ChatSummary from '../components/chat/ChatSummary';
import ConsultationList from '../components/chat/ConsultationList';
import { consultations } from '../data/chatData';
import { getSummaryByConsultationId } from '../data/summaryData';
import { ChatMessage } from '../types/chat';

const AIChatDemo = () => {
  // 채팅 관련 상태
  const [selectedChatIndex, setSelectedChatIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>(consultations[0].dialogue);
  const [role, setRole] = useState<'customer' | 'counselor'>('customer');
  
  // 채팅 데이터 변경 처리
  const handleChatSelect = (index: number) => {
    setSelectedChatIndex(index);
    setMessages(consultations[index].dialogue);
  };

  // 메시지 전송 처리
  const handleSendMessage = (message: string, selectedRole: 'customer' | 'counselor') => {
    const newMessage: ChatMessage = {
      role: selectedRole,
      message
    };
    setMessages([...messages, newMessage]);
  };

  // 현재 선택된 상담의 요약 가져오기
  const currentSummary = getSummaryByConsultationId(consultations[selectedChatIndex].id);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 좌측: 상담 목록 */}
      <div className="w-1/4 h-[calc(100vh-50px)]">
        <ConsultationList
          consultations={consultations}
          onSelect={handleChatSelect}
          selectedIndex={selectedChatIndex}
        />
      </div>

      {/* 중앙: 채팅 뷰 */}
      <div className="w-2/4 flex flex-col bg-white h-[calc(100vh-50px)]">
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

        <div className="flex flex-col flex-1 overflow-y-auto p-2 bg-gray-50">
          <ChatList messages={messages} />
        </div>

        <ChatInput
          onSendMessage={handleSendMessage}
          selectedRole={role}
          onRoleChange={setRole}
        />
      </div>

      {/* 우측: 요약 패널 */}
      <div className="w-1/4 h-[calc(100vh-50px)]">
        <ChatSummary
          messages={messages}
          summary={currentSummary}
        />
      </div>
    </div>
  );
};

export default AIChatDemo;