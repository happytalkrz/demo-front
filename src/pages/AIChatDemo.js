import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import ChatList from '../components/chat/ChatList';
import ChatInput from '../components/chat/ChatInput';
import ConsultationList from '../components/chat/ConsultationList';
import { consultations } from '../data/chatData';
const AIChatDemo = () => {
    // 채팅 관련 상태
    const [selectedChatIndex, setSelectedChatIndex] = useState(0);
    const [messages, setMessages] = useState(consultations[0].dialogue);
    const [role, setRole] = useState('customer');
    // 요약 관련 상태
    const [summary, setSummary] = useState(null);
    const [summaryCount, setSummaryCount] = useState(0);
    const [lastSummaryMessages, setLastSummaryMessages] = useState([]);
    const [apiSummary, setApiSummary] = useState(null);
    const [summaryTimestamp, setSummaryTimestamp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // 요약 영역 표시 상태
    const [showSummary1, setShowSummary1] = useState(true);
    const [showSummary2, setShowSummary2] = useState(true);
    const [showSummary3, setShowSummary3] = useState(true);
    const [showSummary4, setShowSummary4] = useState(true);
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
    // 타임스탬프를 yyyy.MM.dd HH:mm 형식으로 변환
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}.${month}.${day} ${hours}:${minutes} 기준`;
    };
    // 감정에 맞는 이모티콘 표시
    const getEmotionIcon = (emotion) => {
        switch (emotion.toLowerCase()) {
            case '긍정':
                return '😊';
            case '부정':
                return '😞';
            case '중립':
                return '😐';
            default:
                return '❓';
        }
    };
    // 요약 생성 처리
    const handleSummarize = async () => {
        // 로딩 상태 활성화
        setIsLoading(true);
        const newCount = summaryCount + 1;
        setSummaryCount(newCount);
        // 현재 채팅 메시지를 요청한 JSON 형식으로 준비
        const formattedMessages = messages.map(msg => {
            return {
                role: msg.role,
                message: msg.message
            };
        });
        // 샘플 챗봇 메시지 추가 (요청된 형식에 맞춰)
        const chatbotMessages = [
            { role: "chatbot", message: "빠르고 정확한 상담을 위해 고객님의 프로필을 입력해 주세요?" },
            { role: "chatbot", message: "지금은 상담가능 시간이 아닙니다." }
        ];
        // 모든 메시지를 합치고 챗봇 메시지 추가 (2개는 고정 위치에)
        const allMessages = [...formattedMessages];
        if (allMessages.length >= 3) {
            allMessages.splice(1, 0, chatbotMessages[0]);
            if (allMessages.length >= 10) {
                allMessages.splice(10, 0, chatbotMessages[1]);
            }
        }
        const requestBody = {
            id: 500, // 테스트용 고정 ID
            messages: allMessages
        };
        console.log(JSON.stringify(requestBody, null, 2));
        try {
            // API 호출
            const response = await fetch('http://localhost:8080/inference/summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('API 응답:', data);
                // 응답 데이터 저장
                setApiSummary(data.data);
                setSummaryTimestamp(formatTimestamp(data.timestamp));
                // 현재 메시지 저장
                setLastSummaryMessages([...messages]);
            }
            else {
                console.error('API 요청 실패:', response.statusText);
            }
        }
        catch (error) {
            console.error('API 요청 오류:', error);
        }
        finally {
            // 로딩 상태 비활성화
            setIsLoading(false);
        }
    };
    const toggleSummary = (summaryId) => {
        if (summaryId === 1)
            setShowSummary1(!showSummary1);
        else if (summaryId === 2)
            setShowSummary2(!showSummary2);
        else if (summaryId === 3)
            setShowSummary3(!showSummary3);
        else if (summaryId === 4)
            setShowSummary4(!showSummary4);
    };
    // 마지막 요약의 첫 세 메시지 가져오기 (새 탭에서 보여줄 내용)
    const getLastThreeMessages = () => {
        if (lastSummaryMessages.length === 0)
            return "요약 내용이 없습니다.";
        return lastSummaryMessages.slice(0, Math.min(3, lastSummaryMessages.length)).map((msg, idx) => (_jsxs("div", { className: "mb-1", children: [_jsxs("span", { className: "font-medium", children: [msg.role === 'customer' ? '고객' : '상담사', ":"] }), " ", msg.message.length > 50 ? `${msg.message.substring(0, 50)}...` : msg.message] }, idx)));
    };
    return (_jsxs("div", { className: "flex h-screen bg-gray-100", children: [_jsx("div", { className: "w-1/4 h-[calc(100vh-50px)]", children: _jsx(ConsultationList, { consultations: consultations, onSelect: handleChatSelect, selectedIndex: selectedChatIndex }) }), _jsxs("div", { className: "w-2/4 flex flex-col bg-white h-[calc(100vh-50px)]", children: [_jsxs("div", { className: "p-3 border-b border-gray-200 flex items-center", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "text-sm", children: "Tag" }), _jsx("span", { className: "ml-2 text-sm font-medium", children: "memo" })] }), _jsxs("div", { className: "ml-auto flex space-x-1", children: [_jsx("button", { className: "w-5 h-5 flex items-center justify-center rounded border border-gray-300", children: _jsx("span", { className: "text-xs", children: "\u2715" }) }), _jsx("button", { className: "w-5 h-5 flex items-center justify-center rounded border border-gray-300", children: _jsx("span", { className: "text-xs", children: "\u25A1" }) }), _jsx("button", { className: "w-5 h-5 flex items-center justify-center rounded border border-gray-300", children: _jsx("span", { className: "text-xs", children: "\u25C7" }) }), _jsx("button", { className: "w-5 h-5 flex items-center justify-center rounded border border-gray-300", children: _jsx("span", { className: "text-xs", children: "\u25CB" }) })] })] }), _jsx("div", { className: "flex flex-col flex-1 overflow-y-auto p-2 bg-gray-50", children: _jsx(ChatList, { messages: messages }) }), _jsx(ChatInput, { onSendMessage: handleSendMessage, selectedRole: role, onRoleChange: setRole })] }), _jsxs("div", { className: "w-1/4 bg-white border-l border-gray-200 flex flex-col h-[calc(100vh-50px)]", children: [_jsxs("div", { className: "p-3 border-b border-gray-200 flex items-center", children: [_jsx("div", { className: "flex items-center justify-center w-5 h-5 rounded border border-gray-300 mr-2", children: _jsx("span", { className: "text-xs", children: "\u2715" }) }), _jsx("span", { className: "font-medium", children: "h.AI Assistant \uC0C1\uB2F4 \uC694\uC57D" })] }), _jsxs("div", { className: "p-4 overflow-y-auto", children: [_jsx("div", { className: "text-xs text-gray-500 mb-2", children: "AI\uAC00 \uCC98\uB9AC\uD558\uC5EC \uC0C1\uB2F4 \uB0B4\uC6A9\uC744 \uC790\uB3D9\uD574 \uC0DD\uC131\uD569\uB2C8\uB2E4." }), _jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "text-sm font-medium", children: "\uC0C1\uB2F4 \uAC1C\uC694" }), _jsx("div", { className: "text-xs text-gray-600 mt-1", children: "AI\uAC00 \uB4F1\uB85D \uAC1C\uC694\uB97C GOT \uAE30\uBC18\uC73C\uB85C \uC815\uB9AC\uD588\uC2B5\uB2C8\uB2E4. \uC6D0\uACA9 \uC791\uB300\uC5D0 \uC2E4\uB525 \uD45C\uD604\uACFC \uC77C\uCE58\uD560 \uC218\uB3C4\uC788\uC73C\uB098 \uB4F1 \uCC38\uACE0\uC2DC \uD65C\uC6A9\uD574 \uC8FC\uC138\uC694." })] }), _jsxs("div", { className: "border-t border-gray-200 pt-2 mt-4 mb-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-1 cursor-pointer", onClick: () => toggleSummary(1), children: [_jsx("div", { className: "text-sm font-medium", children: "\uC0C1\uB2F4 \uC138\uBD80 \uC694\uC57D" }), _jsx("div", { className: "text-xs text-gray-500", children: "2023.05.07 11:03 \uAE30\uC900" })] }), showSummary1 && (_jsxs("div", { className: "text-xs text-gray-600 pl-2 border-l-2 border-gray-200 ml-1 py-1", children: ["\uACE0\uAC1D: \uB0B4\uC6A9 \uB300\uD654 \uAE30\uB85D\uC5D0 \uC5C6\uB294 \uACF3\uC774", _jsx("br", {}), "\uC0C1\uB2F4\uC0AC: \uC81C\uD488 \uC815\uBCF4 \uC548\uB0B4\uC2DC \uC9C0\uC2DD \uC778\uAC00", _jsx("br", {}), "\uACE0\uAC1D \uAE30\uD0C0: \uBCF4\uD5D8"] }))] }), _jsxs("div", { className: "border-t border-gray-200 pt-2 mb-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-1 cursor-pointer", onClick: () => toggleSummary(2), children: [_jsx("div", { className: "text-sm font-medium", children: "\uC0C1\uB2F4 \uD575\uC2EC 1" }), _jsx("div", { className: "text-xs text-gray-500", children: "2023.05.07 11:03 \uAE30\uC900" })] }), showSummary2 && (_jsxs("div", { className: "text-xs text-gray-600 pl-2 border-l-2 border-gray-200 ml-1 py-1", children: ["\uACE0\uAC1D: \uB0B4\uC6A9 \uB300\uD654 \uAE30\uB85D\uC5D0 \uC5C6\uB294 \uACF3\uC774", _jsx("br", {}), "\uC0C1\uB2F4\uC0AC: \uC81C\uD488 \uC815\uBCF4 \uC548\uB0B4\uC2DC \uC9C0\uC2DD \uC778\uAC00", _jsx("br", {}), "\uACE0\uAC1D \uAE30\uD0C0: \uBCF4\uD5D8"] }))] }), _jsxs("div", { className: "border-t border-gray-200 pt-2 mb-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-1 cursor-pointer", onClick: () => toggleSummary(3), children: [_jsx("div", { className: "text-sm font-medium", children: "\uC0C1\uB2F4 \uD575\uC2EC 2" }), _jsx("div", { className: "text-xs text-gray-500", children: "2023.05.07 11:03 \uAE30\uC900" })] }), showSummary3 && (_jsxs("div", { className: "text-xs text-gray-600 pl-2 border-l-2 border-gray-200 ml-1 py-1", children: ["\uACE0\uAC1D: \uB0B4\uC6A9 \uB300\uD654 \uAE30\uB85D\uC5D0 \uC5C6\uB294 \uACF3\uC774", _jsx("br", {}), "\uC0C1\uB2F4\uC0AC: \uC81C\uD488 \uC815\uBCF4 \uC548\uB0B4\uC2DC \uC9C0\uC2DD \uC778\uAC00", _jsx("br", {}), "\uACE0\uAC1D \uAE30\uD0C0: \uBCF4\uD5D8"] }))] }), (isLoading || apiSummary) && (_jsxs("div", { className: "border-t border-gray-200 pt-2 mb-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-1 cursor-pointer", onClick: () => toggleSummary(4), children: [_jsxs("div", { className: "text-sm font-medium flex items-center", children: [_jsx("span", { children: "\uC0C1\uB2F4\uD575\uC2EC" }), !isLoading && apiSummary && _jsx("span", { className: "ml-2 text-xl", children: getEmotionIcon(apiSummary.emotion) })] }), _jsx("div", { className: "text-xs text-gray-500", children: isLoading ? '생성 중...' : summaryTimestamp })] }), showSummary4 && (_jsx("div", { className: "text-xs text-gray-600 pl-2 border-l-2 border-gray-200 ml-1 py-1", children: isLoading ? (_jsx("div", { className: "flex items-center justify-center py-4", children: _jsxs("div", { className: "animate-pulse flex flex-col items-center", children: [_jsx("div", { className: "h-4 w-3/4 bg-gray-200 rounded mb-2" }), _jsx("div", { className: "h-4 w-full bg-gray-200 rounded mb-2" }), _jsx("div", { className: "h-4 w-5/6 bg-gray-200 rounded" }), _jsx("div", { className: "mt-3 text-sm text-gray-500", children: "\uC0C1\uB2F4 \uC694\uC57D \uC911..." })] }) })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mb-1", children: [_jsx("strong", { children: "\uC81C\uBAA9:" }), " ", apiSummary?.title] }), _jsxs("div", { className: "mb-1", children: [_jsx("strong", { children: "\uC694\uC57D\uB0B4\uC6A9:" }), " ", apiSummary?.summary] }), _jsxs("div", { children: [_jsx("strong", { children: "\uAC10\uC815:" }), " ", apiSummary?.emotion] })] })) }))] })), _jsx("button", { onClick: handleSummarize, disabled: isLoading, className: `w-full py-3 text-white text-sm font-medium rounded ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'}`, children: isLoading ? '상담내용 요약 중...' : '현재까지 상담내용 요약하기' })] })] })] }));
};
export default AIChatDemo;
