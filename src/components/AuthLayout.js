import { jsx as _jsx } from "react/jsx-runtime";
const AuthLayout = ({ children }) => {
    return (_jsx("div", { className: "min-h-screen bg-gray-100 flex items-center justify-center px-4", children: _jsx("div", { className: "w-full max-w-md bg-white p-6 rounded-2xl shadow-lg", children: children }) }));
};
export default AuthLayout;
