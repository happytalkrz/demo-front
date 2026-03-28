import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FiMoreVertical, FiBookmark, FiFlag } from 'react-icons/fi';
import ChatList from '../components/chat/ChatList';
import ChatInput from '../components/chat/ChatInput';
import ChatSummary from '../components/chat/ChatSummary';
import ConsultationList from '../components/chat/ConsultationList';
import { consultations } from '../data/chatData';
import { getSummaryByConsultationId } from '../data/summaryData';
const AIChatDemo = () => {
    // 채팅 관련 상태
    const [selectedChatIndex, setSelectedChatIndex] = useState(0);
    const [messages, setMessages] = useState(consultations[0].dialogue);
    const [role, setRole] = useState('customer');
    // 채팅 데이터 변경 처리
    const handleChatSelect = (index) => {
        setSelectedChatIndex(index);
        setMessages(consultations[index].dialogue);
    };
    // 메시지 전송 처리
    const handleSendMessage = (message, selectedRole) => {
        const newMessage = {
            role: selectedRole,
            message
        };
        setMessages([...messages, newMessage]);
    };
    // 현재 선택된 상담의 요약 가져오기
    const currentSummary = getSummaryByConsultationId(consultations[selectedChatIndex].id);
    return (_jsxs("div", { className: "flex h-screen bg-gray-100", children: [_jsx("div", { className: "w-1/4 h-[calc(100vh-50px)]", children: _jsx(ConsultationList, { consultations: consultations, onSelect: handleChatSelect, selectedIndex: selectedChatIndex }) }), _jsxs("div", { className: "w-2/4 flex flex-col bg-white h-[calc(100vh-50px)]", children: [_jsxs("div", { className: "p-3 border-b border-gray-200 flex items-center", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "text-sm text-gray-500", children: "\uC0C1\uB2F4:" }), _jsx("span", { className: "ml-2 text-sm font-medium", children: consultations[selectedChatIndex].title })] }), _jsxs("div", { className: "ml-auto flex space-x-2", children: [_jsx("button", { className: "p-1.5 hover:bg-gray-100 rounded transition-colors", title: "\uBD81\uB9C8\uD06C", children: _jsx(FiBookmark, { className: "text-gray-500", size: 16 }) }), _jsx("button", { className: "p-1.5 hover:bg-gray-100 rounded transition-colors", title: "\uC6B0\uC120\uC21C\uC704", children: _jsx(FiFlag, { className: "text-gray-500", size: 16 }) }), _jsx("button", { className: "p-1.5 hover:bg-gray-100 rounded transition-colors", title: "\uB354\uBCF4\uAE30", children: _jsx(FiMoreVertical, { className: "text-gray-500", size: 16 }) })] })] }), _jsx("div", { className: "flex flex-col flex-1 overflow-y-auto p-2 bg-gray-50", children: _jsx(ChatList, { messages: messages }) }), _jsx(ChatInput, { onSendMessage: handleSendMessage, selectedRole: role, onRoleChange: setRole })] }), _jsx("div", { className: "w-1/4 h-[calc(100vh-50px)]", children: _jsx(ChatSummary, { messages: messages, summary: currentSummary }) })] }));
};
export default AIChatDemo;
