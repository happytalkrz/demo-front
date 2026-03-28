import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiX } from 'react-icons/fi';
const AIPermissions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activePage, setActivePage] = useState(1);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    // 테이블 데이터
    const tableData = [
        { id: 1, type: '상담사', name: '김철수', userId: 'kim123', userNumber: '12345', access: true, record: true, accessAdv: true, summary: true, summaryAfter: true },
        { id: 2, type: '상담사', name: '이영희', userId: 'lee45', userNumber: '23456', access: true, record: true, accessAdv: true, summary: true, summaryAfter: true },
        { id: 3, type: '관리자', name: '박민수', userId: 'park78', userNumber: '34567', access: true, record: true, accessAdv: true, summary: true, summaryAfter: true },
        { id: 4, type: '상담사', name: '정수진', userId: 'jung22', userNumber: '45678', access: true, record: true, accessAdv: true, summary: true, summaryAfter: true },
        { id: 5, type: '관리자', name: '홍길동', userId: 'hong100', userNumber: '56789', access: true, record: true, accessAdv: true, summary: true, summaryAfter: true },
    ];
    // 페이지 배열 생성
    const pages = [1, 2, 3, 4, 5];
    // 변경 이력 데이터
    const historyData = [
        { id: 1, date: '2023-04-28 14:30:22', operator: '김관리(admin01)', target: '김철수(kim123)', changes: '권한 : Off → On\n권한 상승 : On → Off\nAI 상담 종료 요약 : Off → On' },
        { id: 2, date: '2023-04-27 11:15:43', operator: '이매니저(manager11)', target: '이영희(lee45)', changes: '권한 상승 : On → Off' },
        { id: 3, date: '2023-04-25 09:22:15', operator: '김관리(admin01)', target: '박민수(park78)', changes: 'AI 상담 중 요약 : Off → On' },
        { id: 4, date: '2023-04-25 09:22:15', operator: '김관리(admin01)', target: '박민수(park78)', changes: 'AI 상담 중 요약 : Off → On' },
        { id: 5, date: '2023-04-25 09:22:15', operator: '김관리(admin01)', target: '박민수(park78)', changes: 'AI 상담 중 요약 : Off → On' },
        { id: 6, date: '2023-04-25 09:22:15', operator: '김관리(admin01)', target: '박민수(park78)', changes: 'AI 상담 중 요약 : Off → On' },
        { id: 7, date: '2023-04-25 09:22:15', operator: '김관리(admin01)', target: '박민수(park78)', changes: 'AI 상담 중 요약 : Off → On' },
        { id: 8, date: '2023-04-25 09:22:15', operator: '김관리(admin01)', target: '박민수(park78)', changes: 'AI 상담 중 요약 : Off → On' },
        { id: 9, date: '2023-04-25 09:22:15', operator: '김관리(admin01)', target: '박민수(park78)', changes: 'AI 상담 중 요약 : Off → On' },
    ];
    // 전체 체크박스 상태
    const [allChecked, setAllChecked] = useState(false);
    const [allAccessChecked, setAllAccessChecked] = useState(false);
    const [allRecordChecked, setAllRecordChecked] = useState(false);
    const [allAccessAdvChecked, setAllAccessAdvChecked] = useState(false);
    const [allSummaryChecked, setAllSummaryChecked] = useState(false);
    const [allSummaryAfterChecked, setAllSummaryAfterChecked] = useState(false);
    // 전체 체크박스 핸들러
    const handleAllChecked = (e) => {
        setAllChecked(e.target.checked);
        // 실제 구현에서는 모든 행의 체크박스 상태를 변경
    };
    const handleAllAccessChecked = (e) => {
        setAllAccessChecked(e.target.checked);
        // 실제 구현에서는 모든 행의 'access' 체크박스 상태를 변경
    };
    const handleAllRecordChecked = (e) => {
        setAllRecordChecked(e.target.checked);
        // 실제 구현에서는 모든 행의 'record' 체크박스 상태를 변경
    };
    const handleAllAccessAdvChecked = (e) => {
        setAllAccessAdvChecked(e.target.checked);
        // 실제 구현에서는 모든 행의 'accessAdv' 체크박스 상태를 변경
    };
    const handleAllSummaryChecked = (e) => {
        setAllSummaryChecked(e.target.checked);
        // 실제 구현에서는 모든 행의 'summary' 체크박스 상태를 변경
    };
    const handleAllSummaryAfterChecked = (e) => {
        setAllSummaryAfterChecked(e.target.checked);
        // 실제 구현에서는 모든 행의 'summaryAfter' 체크박스 상태를 변경
    };
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsx("h1", { className: "text-2xl font-semibold mb-6", children: "AI \uAD8C\uD55C \uAD00\uB9AC" }), _jsx("div", { className: "grid grid-cols-1 gap-6", children: _jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsxs("div", { className: "flex mr-4", children: [_jsx("button", { className: "flex items-center justify-center h-10 px-4 border border-gray-300 bg-white text-gray-700 rounded-l-md hover:bg-gray-50 focus:outline-none", children: "\uC804\uCCB4" }), _jsxs("button", { className: "flex items-center justify-center h-10 px-4 border border-gray-300 bg-white text-gray-700 border-l-0 rounded-r-md hover:bg-gray-50 focus:outline-none", children: [_jsx("span", { className: "sr-only", children: "\uC0AD\uC81C" }), _jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })] })] }), _jsxs("div", { className: "relative flex-grow", children: [_jsx("input", { type: "text", placeholder: "\uC0C1\uB2F4\uC0AC\uBA85/\uC544\uC774\uB514 \uAC80\uC0C9", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full h-10 pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(FiSearch, { className: "text-gray-400" }) })] }), _jsx("button", { className: "flex items-center justify-center h-10 ml-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600", onClick: () => setShowHistoryModal(true), children: "\uBCC0\uACBD \uC774\uB825 \uC870\uD68C" }), _jsx("button", { className: "flex items-center justify-center h-10 ml-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600", children: "\uC800\uC7A5" })] }), _jsx("div", { className: "relative overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm text-left text-gray-500", children: [_jsx("thead", { className: "text-xs text-gray-700 uppercase bg-gray-100", children: _jsxs("tr", { children: [_jsx("th", { scope: "col", className: "px-4 py-3", children: _jsx("input", { type: "checkbox", checked: allChecked, onChange: handleAllChecked, className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" }) }), _jsx("th", { scope: "col", className: "px-4 py-3", children: "\uAD6C\uBD84" }), _jsx("th", { scope: "col", className: "px-4 py-3", children: "\uC0C1\uB2F4\uC0AC\uBA85" }), _jsx("th", { scope: "col", className: "px-4 py-3", children: "\uC544\uC774\uB514" }), _jsx("th", { scope: "col", className: "px-4 py-3", children: "\uC0C1\uB2F4\uC0AC \uBC88\uD638" }), _jsx("th", { scope: "col", className: "px-4 py-3", children: _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: allAccessChecked, onChange: handleAllAccessChecked, className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2" }), "\uAD8C\uD55C \uC0C1\uC2B9"] }) }), _jsx("th", { scope: "col", className: "px-4 py-3", children: _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: allRecordChecked, onChange: handleAllRecordChecked, className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2" }), "\uCC44\uD305"] }) }), _jsx("th", { scope: "col", className: "px-4 py-3", children: _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: allAccessAdvChecked, onChange: handleAllAccessAdvChecked, className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2" }), "\uAD8C\uD55C \uD558\uB77D \uBCF4\uAE30"] }) }), _jsx("th", { scope: "col", className: "px-4 py-3", children: _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: allSummaryChecked, onChange: handleAllSummaryChecked, className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2" }), "AI \uC0C1\uB2F4 \uC911 \uC694\uC57D"] }) }), _jsx("th", { scope: "col", className: "px-4 py-3", children: _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: allSummaryAfterChecked, onChange: handleAllSummaryAfterChecked, className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2" }), "AI \uC0C1\uB2F4 \uC885\uB8CC \uC694\uC57D"] }) })] }) }), _jsx("tbody", { children: tableData.map((row) => (_jsxs("tr", { className: "bg-white border-b hover:bg-gray-50", children: [_jsx("td", { className: "px-4 py-4", children: _jsx("input", { type: "checkbox", className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" }) }), _jsx("td", { className: "px-4 py-4", children: row.type }), _jsx("td", { className: "px-4 py-4", children: row.name }), _jsx("td", { className: "px-4 py-4", children: row.userId }), _jsx("td", { className: "px-4 py-4", children: row.userNumber }), _jsx("td", { className: "px-4 py-4", children: _jsx("input", { type: "checkbox", checked: row.access, className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" }) }), _jsx("td", { className: "px-4 py-4", children: _jsx("input", { type: "checkbox", checked: row.record, className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" }) }), _jsx("td", { className: "px-4 py-4", children: _jsx("input", { type: "checkbox", checked: row.accessAdv, className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" }) }), _jsx("td", { className: "px-4 py-4", children: _jsx("input", { type: "checkbox", checked: row.summary, className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" }) }), _jsx("td", { className: "px-4 py-4", children: _jsx("input", { type: "checkbox", checked: row.summaryAfter, className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" }) })] }, row.id))) })] }) }), _jsxs("div", { className: "flex items-center justify-center mt-6", children: [_jsx("button", { className: "px-2 py-1 mx-1 rounded-md", children: _jsx(FiChevronsLeft, {}) }), _jsx("button", { className: "px-2 py-1 mx-1 rounded-md", children: _jsx(FiChevronLeft, {}) }), pages.map((page) => (_jsx("button", { onClick: () => setActivePage(page), className: `px-3 py-1 mx-1 rounded-md ${activePage === page
                                        ? 'bg-gray-800 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'}`, children: page }, page))), _jsx("button", { className: "px-2 py-1 mx-1 rounded-md", children: _jsx(FiChevronRight, {}) }), _jsx("button", { className: "px-2 py-1 mx-1 rounded-md", children: _jsx(FiChevronsRight, {}) })] })] }) }), showHistoryModal && (_jsx("div", { className: "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg w-3/4 max-w-4xl max-h-[80vh] flex flex-col", children: [_jsxs("div", { className: "flex justify-between items-center p-4 border-b", children: [_jsx("h2", { className: "text-lg font-semibold", children: "\uAD8C\uD55C \uBCC0\uACBD \uC774\uB825" }), _jsx("button", { onClick: () => setShowHistoryModal(false), className: "text-gray-500 hover:text-gray-700", children: _jsx(FiX, { size: 20 }) })] }), _jsx("div", { className: "overflow-y-auto flex-grow", children: _jsxs("table", { className: "w-full text-sm text-left text-gray-500", children: [_jsx("thead", { className: "text-xs text-gray-700 uppercase bg-gray-100", children: _jsxs("tr", { children: [_jsx("th", { scope: "col", className: "px-6 py-3", children: "\uBCC0\uACBD \uC77C\uC2DC" }), _jsx("th", { scope: "col", className: "px-6 py-3", children: "\uBCC0\uACBD\uC790" }), _jsx("th", { scope: "col", className: "px-6 py-3", children: "\uBCC0\uACBD \uB300\uC0C1" }), _jsx("th", { scope: "col", className: "px-6 py-3", children: "\uBCC0\uACBD \uB0B4\uC6A9" })] }) }), _jsx("tbody", { children: historyData.map((item) => (_jsxs("tr", { className: "bg-white border-b hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-4", children: item.date }), _jsx("td", { className: "px-6 py-4", children: item.operator }), _jsx("td", { className: "px-6 py-4", children: item.target }), _jsx("td", { className: "px-6 py-4 whitespace-pre-line", children: item.changes })] }, item.id))) })] }) })] }) }))] }));
};
export default AIPermissions;
