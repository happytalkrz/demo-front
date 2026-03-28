import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Tabs = ({ tabs, activeTab, onTabChange }) => {
    return (_jsxs("div", { children: [_jsx("div", { className: "flex border-b border-gray-200", children: tabs.map((tab) => (_jsx("button", { className: `px-4 py-2 text-sm ${activeTab === tab.id
                        ? 'border-b-2 border-blue-500 text-blue-500 font-medium'
                        : 'text-gray-500 hover:text-gray-700'}`, onClick: () => onTabChange(tab.id), children: tab.label }, tab.id))) }), _jsx("div", { className: "mt-4", children: tabs.find((tab) => tab.id === activeTab)?.content })] }));
};
export default Tabs;
