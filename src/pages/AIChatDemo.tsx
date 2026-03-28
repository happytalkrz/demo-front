import { useState } from 'react';
import { FiMoreVertical, FiBookmark, FiFlag } from 'react-icons/fi';
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
            <span className="text-sm text-gray-500">상담:</span>
            <span className="ml-2 text-sm font-medium">{consultations[selectedChatIndex].title}</span>
          </div>
          <div className="ml-auto flex space-x-2">
            <button
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              title="북마크"
            >
              <FiBookmark className="text-gray-500" size={16} />
            </button>
            <button
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              title="우선순위"
            >
              <FiFlag className="text-gray-500" size={16} />
            </button>
            <button
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              title="더보기"
            >
              <FiMoreVertical className="text-gray-500" size={16} />
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