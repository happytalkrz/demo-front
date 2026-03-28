import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

interface ChatInputProps {
  onSendMessage: (message: string, role: 'customer' | 'counselor') => void;
  selectedRole: 'customer' | 'counselor';
  onRoleChange: (role: 'customer' | 'counselor') => void;
}

const ChatInput = ({ onSendMessage, selectedRole, onRoleChange }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message, selectedRole);
      setMessage('');
    }
  };

  const toggleRole = () => {
    onRoleChange(selectedRole === 'customer' ? 'counselor' : 'customer');
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex items-center mb-3">
        <button
          type="button"
          onClick={toggleRole}
          className={`flex items-center px-3 py-1 rounded-md text-sm ${
            selectedRole === 'counselor' 
              ? 'bg-gray-700 text-white' 
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {selectedRole === 'customer' ? '고객' : '상담사'}
        </button>
        <div className="text-xs text-gray-500 ml-2">
          메시지를 입력하실 수 있습니다
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white pr-12"
          placeholder="내용을 입력 하세요..."
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
          disabled={!message.trim()}
        >
          <FiSend className={`text-lg ${message.trim() ? 'text-gray-600' : 'text-gray-400'}`} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput; 