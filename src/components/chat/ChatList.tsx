import { ChatMessage } from '../../types/chat';
import ChatBubble from './ChatBubble';

interface ChatListProps {
  messages: ChatMessage[];
}

const ChatList = ({ messages }: ChatListProps) => {
  // 더 다양한 타임스탬프
  const generateTimestamp = (index: number): string => {
    const baseTime = new Date();
    baseTime.setMinutes(baseTime.getMinutes() - (messages.length - index) * 2);

    const hours = baseTime.getHours();
    const minutes = baseTime.getMinutes().toString().padStart(2, '0');
    const period = hours < 12 ? '오전' : '오후';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

    return `${period} ${displayHours}:${minutes}`;
  };

  return (
    <div className="flex flex-col overflow-y-auto h-[calc(100vh-160px)] px-3 py-2 bg-gradient-to-b from-gray-50 to-white">
      <div className="flex-grow">
        {messages.map((message, index) => (
          <ChatBubble
            key={`${index}-${message.message.substring(0, 10)}`}
            message={message}
            time={generateTimestamp(index)}
          />
        ))}
      </div>

      {messages.length === 0 && (
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 mx-auto">
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">대화 내용이 없습니다</p>
            <p className="text-gray-400 text-xs mt-1">상담을 선택하여 대화를 확인하세요</p>
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <div className="flex justify-center py-3">
          <div className="bg-white shadow-sm border border-gray-200 rounded-full px-4 py-2">
            <p className="text-xs text-gray-500">총 {messages.length}개의 메시지</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatList; 