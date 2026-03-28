import { useState, useRef, useEffect } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { TableColumn, PaginationInfo } from '../../types/common';
import Pagination from './Pagination';

interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  onSort?: (column: keyof T, direction: 'asc' | 'desc') => void;
  className?: string;
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  pagination,
  onPageChange,
  onSort,
  className = '',
}: DataTableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;

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

  const handleSort = (column: keyof T) => {
    if (!onSort) return;

    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(direction);
    onSort(column, direction);
  };

  const renderSortIcon = (column: keyof T) => {
    if (sortColumn !== column) return null;

    return sortDirection === 'asc' ? (
      <FiChevronUp className="w-4 h-4" />
    ) : (
      <FiChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="relative">
        {/* 좌측 스크롤 인디케이터 */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        )}

        {/* 우측 스크롤 인디케이터 */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        )}

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto overscroll-x-contain"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin'
          }}
          onScroll={handleScroll}
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-24 ${
                      column.sortable ? 'cursor-pointer select-none hover:bg-gray-100' : ''
                    }`}
                    style={{ minWidth: '6rem' }}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span className="truncate">{column.label}</span>
                      {column.sortable && renderSortIcon(column.key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 min-w-24"
                      style={{ minWidth: '6rem' }}
                    >
                      <div className="truncate max-w-32 sm:max-w-none" title={String(row[column.key])}>
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && onPageChange && (
        <div className="mt-4">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default DataTable;