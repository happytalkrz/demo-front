import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ChatBubble = ({ message, time = '오전 10:14' }) => {
    const isCustomer = message.role === 'customer';
    return (_jsxs("div", { className: `flex ${isCustomer ? 'justify-end' : 'justify-start'} my-2 items-end`, children: [!isCustomer && (_jsx("div", { className: "w-8 h-8 rounded-full bg-gray-300 mr-2 flex-shrink-0 flex items-center justify-center text-xs", children: "\uC0C1\uB2F4" })), _jsxs("div", { className: "flex flex-col max-w-[80%]", children: [_jsx("div", { className: `rounded-lg px-3 py-2 break-words ${isCustomer
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-gray-700 text-white'}`, children: _jsx("p", { className: "text-sm whitespace-pre-wrap", children: message.message }) }), _jsx("span", { className: "text-[10px] text-gray-500 mt-1 ml-1", children: time })] }), isCustomer && (_jsx("div", { className: "w-8 h-8 rounded-full bg-gray-200 ml-2 flex-shrink-0 flex items-center justify-center text-xs", children: "\uACE0\uAC1D" }))] }));
};
export default ChatBubble;
