import { ChatData } from '../../types/chat';

interface ChatSelectorProps {
  chatData: ChatData[];
  onSelect: (index: number) => void;
  selectedIndex: number;
}

const ChatSelector = ({ chatData, onSelect, selectedIndex }: ChatSelectorProps) => {
  return (
    <div className="mb-1">
      <div className="flex items-center mb-1">
        <span className="text-xs text-gray-500 mr-2">채팅 데이터:</span>
      </div>
      <select
        className="w-full p-1.5 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        value={selectedIndex}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        {chatData.map((chat, index) => (
          <option key={index} value={index}>
            {chat.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChatSelector; 