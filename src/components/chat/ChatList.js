import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ChatBubble from './ChatBubble';
const ChatList = ({ messages }) => {
    // 이미지에서 보여진 고정된 타임스탬프를 위한 배열
    const timestamps = [
        '오전 10:14', '오전 10:14', '오전 10:14', '오전 10:14',
        '오전 10:14', '오전 10:14', '오전 10:14', '오전 10:14',
        '오전 10:14', '오전 10:14', '오전 10:14', '오전 10:14'
    ];
    return (_jsxs("div", { className: "flex flex-col overflow-y-auto h-[calc(100vh-160px)] px-4 py-6 bg-white", children: [_jsx("div", { className: "flex-grow space-y-2", children: messages.map((message, index) => (_jsx(ChatBubble, { message: message, time: timestamps[index % timestamps.length] }, index))) }), messages.length === 0 && (_jsx("div", { className: "flex-grow flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-gray-400 text-sm mb-2", children: "\uB300\uD654 \uB0B4\uC6A9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" }), _jsx("p", { className: "text-gray-300 text-xs", children: "\uC0C1\uB2F4\uC744 \uC2DC\uC791\uD558\uB824\uBA74 \uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694" })] }) })), _jsx("div", { className: "mt-4 pt-4 border-t border-gray-100 text-center", children: _jsx("p", { className: "text-xs text-gray-400", children: "\uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694" }) })] }));
};
export default ChatList;
