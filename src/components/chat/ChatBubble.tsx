import { ChatMessage } from '../../types/chat';
import { FiUser, FiHeadphones, FiMessageCircle } from 'react-icons/fi';

interface ChatBubbleProps {
  message: ChatMessage;
  time?: string;
}

const ChatBubble = ({ message, time = '오전 10:14' }: ChatBubbleProps) => {
  const isCustomer = message.role === 'customer';
  const isChatbot = message.role === 'chatbot';

  // 역할별 스타일 설정
  const getRoleStyles = () => {
    switch (message.role) {
      case 'customer':
        return {
          bubbleClass: 'bg-blue-500 text-white',
          avatarClass: 'bg-blue-100 text-blue-600',
          icon: <FiUser size={14} />,
          label: '고객'
        };
      case 'counselor':
        return {
          bubbleClass: 'bg-gray-100 text-gray-800',
          avatarClass: 'bg-green-100 text-green-600',
          icon: <FiHeadphones size={14} />,
          label: '상담사'
        };
      case 'chatbot':
        return {
          bubbleClass: 'bg-purple-100 text-purple-800',
          avatarClass: 'bg-purple-100 text-purple-600',
          icon: <FiMessageCircle size={14} />,
          label: '챗봇'
        };
      default:
        return {
          bubbleClass: 'bg-gray-100 text-gray-800',
          avatarClass: 'bg-gray-100 text-gray-600',
          icon: <FiUser size={14} />,
          label: '사용자'
        };
    }
  };

  const roleStyles = getRoleStyles();

  return (
    <div className={`flex ${isCustomer ? 'justify-end' : 'justify-start'} mb-4 items-end`}>
      {!isCustomer && (
        <div className={`w-10 h-10 rounded-full mr-3 flex-shrink-0 flex items-center justify-center ${roleStyles.avatarClass}`}>
          {roleStyles.icon}
        </div>
      )}

      <div className="flex flex-col max-w-[75%]">
        {!isCustomer && (
          <span className="text-xs text-gray-500 mb-1 ml-1">{roleStyles.label}</span>
        )}
        <div className={`rounded-2xl px-4 py-3 break-words ${roleStyles.bubbleClass}`}>
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.message}</p>
        </div>
        <div className={`flex items-center mt-1 ${isCustomer ? 'justify-end mr-1' : 'justify-start ml-1'}`}>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
      </div>

      {isCustomer && (
        <div className={`w-10 h-10 rounded-full ml-3 flex-shrink-0 flex items-center justify-center ${roleStyles.avatarClass}`}>
          {roleStyles.icon}
        </div>
      )}
    </div>
  );
};

export default ChatBubble; 