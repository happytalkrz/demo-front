import { ChatMessage } from '../../types/chat';
import { FiUser, FiHeadphones } from 'react-icons/fi';

interface ChatBubbleProps {
  message: ChatMessage;
  time?: string;
}

const ChatBubble = ({ message, time = '오전 10:14' }: ChatBubbleProps) => {
  const isCustomer = message.role === 'customer';

  return (
    <div className={`flex ${isCustomer ? 'justify-end' : 'justify-start'} my-3 items-end`}>
      {!isCustomer && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mr-3 flex-shrink-0 flex items-center justify-center shadow-md">
          <FiHeadphones className="text-white text-sm" />
        </div>
      )}

      <div className="flex flex-col max-w-[75%] relative">
        {/* 말꼬리 */}
        <div className={`relative ${isCustomer ? 'ml-auto' : 'mr-auto'}`}>
          {/* 상담사 말꼬리 (왼쪽) */}
          {!isCustomer && (
            <div className="absolute -left-2 bottom-3 w-0 h-0 border-r-8 border-r-blue-600 border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
          )}

          {/* 고객 말꼬리 (오른쪽) */}
          {isCustomer && (
            <div className="absolute -right-2 bottom-3 w-0 h-0 border-l-8 border-l-green-500 border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
          )}

          <div
            className={`rounded-2xl px-4 py-3 break-words shadow-lg ${
              isCustomer
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 text-white'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.message}</p>
          </div>
        </div>

        <div className={`flex items-center mt-1 ${isCustomer ? 'justify-end mr-2' : 'justify-start ml-2'}`}>
          <span className="text-xs text-gray-400 font-medium">{time}</span>
        </div>
      </div>

      {isCustomer && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-green-600 ml-3 flex-shrink-0 flex items-center justify-center shadow-md">
          <FiUser className="text-white text-sm" />
        </div>
      )}
    </div>
  );
};

export default ChatBubble; 