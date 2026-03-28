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
    <div className="flex flex-col overflow-y-auto h-[calc(100vh-200px)] p-2 bg-gray-50">
      <div className="flex-grow">
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
          <p className="text-gray-400 text-sm">대화 내용이 없습니다</p>
        </div>
      )}
      <div className="p-2 text-center text-xs text-gray-400">
        내용을 입력 하세요.
      </div>
    </div>
  );
};

export default ChatList; 