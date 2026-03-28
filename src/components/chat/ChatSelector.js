import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ChatSelector = ({ chatData, onSelect, selectedIndex }) => {
    return (_jsxs("div", { className: "mb-1", children: [_jsx("div", { className: "flex items-center mb-1", children: _jsx("span", { className: "text-xs text-gray-500 mr-2", children: "\uCC44\uD305 \uB370\uC774\uD130:" }) }), _jsx("select", { className: "w-full p-1.5 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400", value: selectedIndex, onChange: (e) => onSelect(Number(e.target.value)), children: chatData.map((chat, index) => (_jsx("option", { value: index, children: chat.title }, index))) })] }));
};
export default ChatSelector;
