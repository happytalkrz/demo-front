import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const StatCard = ({ data }) => {
    const { icon: Icon, title, value, bgColor, iconColor } = data;
    return (_jsx("div", { className: "bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-md transition-shadow min-h-[100px] flex items-center", children: _jsxs("div", { className: "flex items-center w-full", children: [_jsx("div", { className: `${bgColor} p-2 sm:p-3 rounded-full flex-shrink-0`, children: _jsx(Icon, { className: `${iconColor} text-lg sm:text-xl` }) }), _jsxs("div", { className: "ml-3 sm:ml-4 min-w-0 flex-1", children: [_jsx("h2", { className: "text-xs sm:text-sm text-gray-500 truncate", children: title }), _jsx("p", { className: "text-lg sm:text-xl font-semibold truncate", children: value })] })] }) }));
};
export default StatCard;
