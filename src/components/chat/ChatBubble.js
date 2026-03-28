import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FiUser, FiHeadphones, FiMessageCircle } from 'react-icons/fi';
const ChatBubble = ({ message, time = '오전 10:14' }) => {
    const isCustomer = message.role === 'customer';
    const isChatbot = message.role === 'chatbot';
    // 역할별 스타일 설정
    const getRoleStyles = () => {
        switch (message.role) {
            case 'customer':
                return {
                    bubbleClass: 'bg-blue-500 text-white',
                    avatarClass: 'bg-blue-100 text-blue-600',
                    icon: _jsx(FiUser, { size: 14 }),
                    label: '고객'
                };
            case 'counselor':
                return {
                    bubbleClass: 'bg-gray-100 text-gray-800',
                    avatarClass: 'bg-green-100 text-green-600',
                    icon: _jsx(FiHeadphones, { size: 14 }),
                    label: '상담사'
                };
            case 'chatbot':
                return {
                    bubbleClass: 'bg-purple-100 text-purple-800',
                    avatarClass: 'bg-purple-100 text-purple-600',
                    icon: _jsx(FiMessageCircle, { size: 14 }),
                    label: '챗봇'
                };
            default:
                return {
                    bubbleClass: 'bg-gray-100 text-gray-800',
                    avatarClass: 'bg-gray-100 text-gray-600',
                    icon: _jsx(FiUser, { size: 14 }),
                    label: '사용자'
                };
        }
    };
    const roleStyles = getRoleStyles();
    return (_jsxs("div", { className: `flex ${isCustomer ? 'justify-end' : 'justify-start'} mb-4 items-end`, children: [!isCustomer && (_jsx("div", { className: `w-10 h-10 rounded-full mr-3 flex-shrink-0 flex items-center justify-center ${roleStyles.avatarClass}`, children: roleStyles.icon })), _jsxs("div", { className: "flex flex-col max-w-[75%]", children: [!isCustomer && (_jsx("span", { className: "text-xs text-gray-500 mb-1 ml-1", children: roleStyles.label })), _jsx("div", { className: `rounded-2xl px-4 py-3 break-words ${roleStyles.bubbleClass}`, children: _jsx("p", { className: "text-sm whitespace-pre-wrap leading-relaxed", children: message.message }) }), _jsx("div", { className: `flex items-center mt-1 ${isCustomer ? 'justify-end mr-1' : 'justify-start ml-1'}`, children: _jsx("span", { className: "text-xs text-gray-400", children: time }) })] }), isCustomer && (_jsx("div", { className: `w-10 h-10 rounded-full ml-3 flex-shrink-0 flex items-center justify-center ${roleStyles.avatarClass}`, children: roleStyles.icon }))] }));
};
export default ChatBubble;
