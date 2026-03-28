import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const StatCard = ({ data }) => {
    const { icon: Icon, title, value, bgColor, iconColor } = data;
    return (_jsx("div", { className: "bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: `${bgColor} p-3 rounded-full`, children: _jsx(Icon, { className: `${iconColor} text-xl` }) }), _jsxs("div", { className: "ml-4", children: [_jsx("h2", { className: "text-sm text-gray-500", children: title }), _jsx("p", { className: "text-xl font-semibold", children: value })] })] }) }));
};
export default StatCard;
