import { ChatMessage } from '../../types/chat';

interface ChatBubbleProps {
  message: ChatMessage;
  time?: string;
}

const ChatBubble = ({ message, time = '오전 10:14' }: ChatBubbleProps) => {
  const isCustomer = message.role === 'customer';
  const isChatbot = message.role === 'chatbot';

  return (
    <div className={`flex ${isCustomer ? 'justify-end' : 'justify-start'} mb-4 items-end group`}>
      {!isCustomer && (
        <div className={`w-9 h-9 rounded-full mr-3 flex-shrink-0 flex items-center justify-center text-xs font-medium shadow-sm ${
          isChatbot
            ? 'bg-blue-500 text-white'
            : 'bg-gray-600 text-white'
        }`}>
          {isChatbot ? 'AI' : '상담'}
        </div>
      )}

      <div className="flex flex-col max-w-[75%]">
        <div
          className={`rounded-2xl px-4 py-3 break-words shadow-sm transition-all duration-200 ${
            isCustomer
              ? 'bg-blue-500 text-white rounded-br-md'
              : isChatbot
              ? 'bg-blue-50 text-blue-800 border border-blue-200 rounded-bl-md'
              : 'bg-gray-100 text-gray-800 border border-gray-200 rounded-bl-md'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.message}</p>
        </div>
        <span className={`text-[11px] text-gray-400 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
          isCustomer ? 'text-right' : 'text-left'
        }`}>
          {time}
        </span>
      </div>

      {isCustomer && (
        <div className="w-9 h-9 rounded-full bg-blue-500 ml-3 flex-shrink-0 flex items-center justify-center text-xs font-medium text-white shadow-sm">
          고객
        </div>
      )}
    </div>
  );
};

export default ChatBubble; 