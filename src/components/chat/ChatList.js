import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ChatBubble from './ChatBubble';
const ChatList = ({ messages }) => {
    // 이미지에서 보여진 고정된 타임스탬프를 위한 배열
    const timestamps = [
        '오전 10:14', '오전 10:14', '오전 10:14', '오전 10:14',
        '오전 10:14', '오전 10:14', '오전 10:14', '오전 10:14',
        '오전 10:14', '오전 10:14', '오전 10:14', '오전 10:14'
    ];
    return (_jsxs("div", { className: "flex flex-col overflow-y-auto h-[calc(100vh-160px)] p-2 bg-gray-50", children: [_jsx("div", { className: "flex-grow", children: messages.map((message, index) => (_jsx(ChatBubble, { message: message, time: timestamps[index % timestamps.length] }, index))) }), messages.length === 0 && (_jsx("div", { className: "flex-grow flex items-center justify-center", children: _jsx("p", { className: "text-gray-400 text-sm", children: "\uB300\uD654 \uB0B4\uC6A9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" }) })), _jsx("div", { className: "p-2 text-center text-xs text-gray-400", children: "\uB0B4\uC6A9\uC744 \uC785\uB825 \uD558\uC138\uC694." })] }));
};
export default ChatList;
