import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
const ChatSummary = ({ messages, summary }) => {
    // 섹션 전개 상태
    const [expandedSections, setExpandedSections] = useState({
        summary1: true,
        summary2: true,
        summary3: true,
        apiSummary: true,
    });
    // API 요약 관련 상태
    const [apiSummary, setApiSummary] = useState(null);
    const [summaryTimestamp, setSummaryTimestamp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        // 현재 채팅 메시지를 요청한 JSON 형식으로 준비
        const formattedMessages = messages.map(msg => ({
            role: msg.role,
            message: msg.message
        }));
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
    const toggleSummary = (sectionKey) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionKey]: !prev[sectionKey],
        }));
    };
    return (_jsxs("div", { className: "w-full bg-white border-l border-gray-200 flex flex-col h-full", children: [_jsxs("div", { className: "p-3 border-b border-gray-200 flex items-center", children: [_jsx("div", { className: "flex items-center justify-center w-5 h-5 rounded border border-gray-300 mr-2", children: _jsx("span", { className: "text-xs", children: "\u2715" }) }), _jsx("span", { className: "font-medium", children: "h.AI Assistant \uC0C1\uB2F4 \uC694\uC57D" })] }), _jsxs("div", { className: "p-4 overflow-y-auto flex-1", children: [_jsx("div", { className: "text-xs text-gray-500 mb-2", children: "AI\uAC00 \uCC98\uB9AC\uD558\uC5EC \uC0C1\uB2F4 \uB0B4\uC6A9\uC744 \uC790\uB3D9\uD574 \uC0DD\uC131\uD569\uB2C8\uB2E4." }), _jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "text-sm font-medium", children: "\uC0C1\uB2F4 \uAC1C\uC694" }), _jsx("div", { className: "text-xs text-gray-600 mt-1", children: summary ? summary.content.mainIssue : "AI가 등록 개요를 GOT 기반으로 정리했습니다. 원격 작대에 실딥 표현과 일치할 수도있으나 등 참고시 활용해 주세요." })] }), _jsxs("div", { className: "border-t border-gray-200 pt-2 mt-4 mb-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-1 cursor-pointer", onClick: () => toggleSummary('summary1'), children: [_jsx("div", { className: "text-sm font-medium", children: "\uC0C1\uB2F4 \uC138\uBD80 \uC694\uC57D" }), _jsx("div", { className: "text-xs text-gray-500", children: "2023.05.07 11:03 \uAE30\uC900" })] }), expandedSections.summary1 && (_jsx("div", { className: "text-xs text-gray-600 pl-2 border-l-2 border-gray-200 ml-1 py-1", children: summary ? (_jsxs(_Fragment, { children: ["\uBB38\uC758 \uB0B4\uC6A9: ", summary.content.mainIssue, _jsx("br", {}), "\uC0C1\uB2F4 \uACB0\uACFC: ", summary.content.result, _jsx("br", {}), "\uD6C4\uC18D \uC870\uCE58: ", summary.content.nextAction] })) : (_jsxs(_Fragment, { children: ["\uACE0\uAC1D: \uB0B4\uC6A9 \uB300\uD654 \uAE30\uB85D\uC5D0 \uC5C6\uB294 \uACF3\uC774", _jsx("br", {}), "\uC0C1\uB2F4\uC0AC: \uC81C\uD488 \uC815\uBCF4 \uC548\uB0B4\uC2DC \uC9C0\uC2DD \uC778\uAC00", _jsx("br", {}), "\uACE0\uAC1D \uAE30\uD0C0: \uBCF4\uD5D8"] })) }))] }), _jsxs("div", { className: "border-t border-gray-200 pt-2 mb-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-1 cursor-pointer", onClick: () => toggleSummary('summary2'), children: [_jsx("div", { className: "text-sm font-medium", children: "\uC0C1\uB2F4 \uD575\uC2EC 1" }), _jsx("div", { className: "text-xs text-gray-500", children: "2023.05.07 11:03 \uAE30\uC900" })] }), expandedSections.summary2 && (_jsxs("div", { className: "text-xs text-gray-600 pl-2 border-l-2 border-gray-200 ml-1 py-1", children: ["\uACE0\uAC1D: \uB0B4\uC6A9 \uB300\uD654 \uAE30\uB85D\uC5D0 \uC5C6\uB294 \uACF3\uC774", _jsx("br", {}), "\uC0C1\uB2F4\uC0AC: \uC81C\uD488 \uC815\uBCF4 \uC548\uB0B4\uC2DC \uC9C0\uC2DD \uC778\uAC00", _jsx("br", {}), "\uACE0\uAC1D \uAE30\uD0C0: \uBCF4\uD5D8"] }))] }), _jsxs("div", { className: "border-t border-gray-200 pt-2 mb-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-1 cursor-pointer", onClick: () => toggleSummary('summary3'), children: [_jsx("div", { className: "text-sm font-medium", children: "\uC0C1\uB2F4 \uD575\uC2EC 2" }), _jsx("div", { className: "text-xs text-gray-500", children: "2023.05.07 11:03 \uAE30\uC900" })] }), expandedSections.summary3 && (_jsxs("div", { className: "text-xs text-gray-600 pl-2 border-l-2 border-gray-200 ml-1 py-1", children: ["\uACE0\uAC1D: \uB0B4\uC6A9 \uB300\uD654 \uAE30\uB85D\uC5D0 \uC5C6\uB294 \uACF3\uC774", _jsx("br", {}), "\uC0C1\uB2F4\uC0AC: \uC81C\uD488 \uC815\uBCF4 \uC548\uB0B4\uC2DC \uC9C0\uC2DD \uC778\uAC00", _jsx("br", {}), "\uACE0\uAC1D \uAE30\uD0C0: \uBCF4\uD5D8"] }))] }), (isLoading || apiSummary) && (_jsxs("div", { className: "border-t border-gray-200 pt-2 mb-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-1 cursor-pointer", onClick: () => toggleSummary('apiSummary'), children: [_jsxs("div", { className: "text-sm font-medium flex items-center", children: [_jsx("span", { children: "\uC0C1\uB2F4\uD575\uC2EC" }), !isLoading && apiSummary && _jsx("span", { className: "ml-2 text-xl", children: getEmotionIcon(apiSummary.emotion) })] }), _jsx("div", { className: "text-xs text-gray-500", children: isLoading ? '생성 중...' : summaryTimestamp })] }), expandedSections.apiSummary && (_jsx("div", { className: "text-xs text-gray-600 pl-2 border-l-2 border-gray-200 ml-1 py-1", children: isLoading ? (_jsx("div", { className: "flex items-center justify-center py-4", children: _jsxs("div", { className: "animate-pulse flex flex-col items-center", children: [_jsx("div", { className: "h-4 w-3/4 bg-gray-200 rounded mb-2" }), _jsx("div", { className: "h-4 w-full bg-gray-200 rounded mb-2" }), _jsx("div", { className: "h-4 w-5/6 bg-gray-200 rounded" }), _jsx("div", { className: "mt-3 text-sm text-gray-500", children: "\uC0C1\uB2F4 \uC694\uC57D \uC911..." })] }) })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mb-1", children: [_jsx("strong", { children: "\uC81C\uBAA9:" }), " ", apiSummary?.title] }), _jsxs("div", { className: "mb-1", children: [_jsx("strong", { children: "\uC694\uC57D\uB0B4\uC6A9:" }), " ", apiSummary?.summary] }), _jsxs("div", { children: [_jsx("strong", { children: "\uAC10\uC815:" }), " ", apiSummary?.emotion] })] })) }))] })), _jsx("button", { onClick: handleSummarize, disabled: isLoading, className: `w-full py-3 text-white text-sm font-medium rounded ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'}`, children: isLoading ? '상담내용 요약 중...' : '현재까지 상담내용 요약하기' })] })] }));
};
export default ChatSummary;
