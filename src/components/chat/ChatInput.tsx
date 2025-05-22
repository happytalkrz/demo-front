import { useState } from 'react';

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
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4L3 11L10 14L13 21L20 4Z" stroke="#888888" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInput; 