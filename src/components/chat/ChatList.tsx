import { ChatMessage } from '../../types/chat';
import ChatBubble from './ChatBubble';

interface ChatListProps {
  messages: ChatMessage[];
}

const ChatList = ({ messages }: ChatListProps) => {
  // 이미지에서 보여진 고정된 타임스탬프를 위한 배열
  const timestamps = [
    '오전 10:14', '오전 10:14', '오전 10:14', '오전 10:14', 
    '오전 10:14', '오전 10:14', '오전 10:14', '오전 10:14',
    '오전 10:14', '오전 10:14', '오전 10:14', '오전 10:14'
  ];

  return (
    <div className="flex flex-col overflow-y-auto h-[calc(100vh-160px)] px-4 py-6 bg-white">
      <div className="flex-grow space-y-2">
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            message={message}
            time={timestamps[index % timestamps.length]}
          />
        ))}
      </div>
      {messages.length === 0 && (
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">대화 내용이 없습니다</p>
            <p className="text-gray-300 text-xs">상담을 시작하려면 메시지를 입력해주세요</p>
          </div>
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">메시지를 입력해주세요</p>
      </div>
    </div>
  );
};

export default ChatList; 