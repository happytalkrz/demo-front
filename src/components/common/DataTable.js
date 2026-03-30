import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import Pagination from './Pagination';
const DataTable = ({ data, columns, pagination, onPageChange, onSort, className = '', }) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const scrollContainerRef = useRef(null);
    const checkScrollPosition = () => {
        if (!scrollContainerRef.current)
            return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    };
    const handleScroll = () => {
        checkScrollPosition();
    };
    useEffect(() => {
        checkScrollPosition();
        const handleResize = () => {
            checkScrollPosition();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [data, columns]);
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
    return (_jsxs("div", { className: `overflow-hidden ${className}`, children: [_jsxs("div", { className: "relative", children: [canScrollLeft && (_jsx("div", { className: "absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" })), canScrollRight && (_jsx("div", { className: "absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" })), _jsx("div", { ref: scrollContainerRef, className: "overflow-x-auto overscroll-x-contain", style: {
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'thin'
                        }, onScroll: handleScroll, children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsx("tr", { children: columns.map((column) => (_jsx("th", { className: `px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-24 ${column.sortable ? 'cursor-pointer select-none hover:bg-gray-100' : ''}`, style: { minWidth: '6rem' }, onClick: () => column.sortable && handleSort(column.key), children: _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { className: "truncate", children: column.label }), column.sortable && renderSortIcon(column.key)] }) }, String(column.key)))) }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: data.map((row, index) => (_jsx("tr", { className: "hover:bg-gray-50", children: columns.map((column) => (_jsx("td", { className: "px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 min-w-24", style: { minWidth: '6rem' }, children: _jsx("div", { className: "truncate max-w-32 sm:max-w-none", title: String(row[column.key]), children: column.render ? column.render(row[column.key], row) : row[column.key] }) }, String(column.key)))) }, index))) })] }) })] }), pagination && onPageChange && (_jsx("div", { className: "mt-4", children: _jsx(Pagination, { currentPage: pagination.currentPage, totalPages: pagination.totalPages, onPageChange: onPageChange }) }))] }));
};
export default DataTable;
