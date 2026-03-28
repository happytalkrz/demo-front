import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import Pagination from './Pagination';
const DataTable = ({ data, columns, pagination, onPageChange, onSort, className = '', }) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const handleSort = (column) => {
        if (!onSort)
            return;
        const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortDirection(direction);
        onSort(column, direction);
    };
    const renderSortIcon = (column) => {
        if (sortColumn !== column)
            return null;
        return sortDirection === 'asc' ? (_jsx(FiChevronUp, { className: "w-4 h-4" })) : (_jsx(FiChevronDown, { className: "w-4 h-4" }));
    };
    return (_jsxs("div", { className: `overflow-hidden ${className}`, children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsx("tr", { children: columns.map((column) => (_jsx("th", { className: `px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.sortable ? 'cursor-pointer select-none hover:bg-gray-100' : ''}`, onClick: () => column.sortable && handleSort(column.key), children: _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { children: column.label }), column.sortable && renderSortIcon(column.key)] }) }, String(column.key)))) }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: data.map((row, index) => (_jsx("tr", { className: "hover:bg-gray-50", children: columns.map((column) => (_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: column.render ? column.render(row[column.key], row) : row[column.key] }, String(column.key)))) }, index))) })] }) }), pagination && onPageChange && (_jsx("div", { className: "mt-4", children: _jsx(Pagination, { currentPage: pagination.currentPage, totalPages: pagination.totalPages, onPageChange: onPageChange }) }))] }));
};
export default DataTable;
