import { ChatMessage } from '../../types/chat';

interface ChatBubbleProps {
  message: ChatMessage;
  time?: string;
}

const ChatBubble = ({ message, time = '오전 10:14' }: ChatBubbleProps) => {
  const isCustomer = message.role === 'customer';

  return (
    <div className={`flex ${isCustomer ? 'justify-end' : 'justify-start'} my-2 items-end`}>
      {!isCustomer && (
        <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 flex-shrink-0 flex items-center justify-center text-xs">
          상담
        </div>
      )}
      
      <div className="flex flex-col max-w-[80%]">
        <div 
          className={`rounded-lg px-3 py-2 break-words ${
            isCustomer 
              ? 'bg-gray-100 text-gray-800' 
              : 'bg-gray-700 text-white'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
        </div>
        <span className="text-[10px] text-gray-500 mt-1 ml-1">{time}</span>
      </div>
      
      {isCustomer && (
        <div className="w-8 h-8 rounded-full bg-gray-200 ml-2 flex-shrink-0 flex items-center justify-center text-xs">
          고객
        </div>
      )}
    </div>
  );
};

export default ChatBubble; 