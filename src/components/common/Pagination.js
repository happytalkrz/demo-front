import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (_jsxs("div", { className: "flex justify-center items-center space-x-2 my-4", children: [_jsx("button", { onClick: () => onPageChange(currentPage - 1), disabled: currentPage === 1, className: "px-3 py-1 rounded-md bg-white border border-gray-300 disabled:opacity-50", children: "<" }), pageNumbers.map((number) => (_jsx("button", { onClick: () => onPageChange(number), className: `px-3 py-1 rounded-md ${currentPage === number
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-300'}`, children: number }, number))), _jsx("button", { onClick: () => onPageChange(currentPage + 1), disabled: currentPage === totalPages, className: "px-3 py-1 rounded-md bg-white border border-gray-300 disabled:opacity-50", children: ">" })] }));
};
export default Pagination;
