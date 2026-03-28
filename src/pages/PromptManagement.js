import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { FiEdit2, FiEye, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import Dialog from '../components/common/Dialog';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import { useToast } from '../hooks/useToast';
import { initialPrompts, statusOptions } from '../data/promptData';
const PromptManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [prompts, setPrompts] = useState(initialPrompts);
    // Modal 상태
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [editingId, setEditingId] = useState(null);
    // 삭제 Dialog 상태
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [deleteTargetName, setDeleteTargetName] = useState('');
    // 미리보기 Modal 상태
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [previewPrompt, setPreviewPrompt] = useState(null);
    // Toast 훅
    const toast = useToast();
    // 폼 상태
    const [formData, setFormData] = useState({
        name: '',
        content: '',
        status: '기본 프롬프트 사용 중',
        isDefault: false
    });
    const navigate = useNavigate();
    const itemsPerPage = 10;
    // 프롬프트 편집 - Modal로 변경
    const handleEditPrompt = (prompt) => {
        openEditModal(prompt);
    };
    // Modal 관리 함수들
    const openAddModal = () => {
        setModalMode('add');
        setFormData({
            name: '',
            content: '',
            status: '기본 프롬프트 사용 중',
            isDefault: false
        });
        setEditingId(null);
        setIsModalOpen(true);
    };
    const openEditModal = (prompt) => {
        setModalMode('edit');
        setFormData({
            name: prompt.name,
            content: prompt.content,
            status: prompt.status,
            isDefault: prompt.isDefault
        });
        setEditingId(prompt.id);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };
    // 삭제 Dialog 관리 함수들
    const openDeleteDialog = (prompt) => {
        setDeleteTargetId(prompt.id);
        setDeleteTargetName(prompt.name);
        setIsDeleteDialogOpen(true);
    };
    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setDeleteTargetId(null);
        setDeleteTargetName('');
    };
    const handleConfirmDelete = () => {
        if (deleteTargetId) {
            setPrompts(prev => prev.filter(prompt => prompt.id !== deleteTargetId));
            toast.success('프롬프트 삭제 완료', `"${deleteTargetName}" 프롬프트가 성공적으로 삭제되었습니다.`);
        }
        closeDeleteDialog();
    };
    // 미리보기 Modal 관리 함수들
    const openPreviewModal = (prompt) => {
        setPreviewPrompt(prompt);
        setIsPreviewModalOpen(true);
    };
    const closePreviewModal = () => {
        setIsPreviewModalOpen(false);
        setPreviewPrompt(null);
    };
    // 폼 데이터 변경 핸들러
    const handleFormChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    // 저장 핸들러
    const handleSave = () => {
        if (!formData.name.trim() || !formData.content.trim()) {
            return; // 간단한 validation
        }
        if (modalMode === 'add') {
            const newPrompt = {
                id: Math.max(...prompts.map(p => p.id)) + 1,
                name: formData.name,
                content: formData.content,
                status: formData.status,
                isDefault: formData.isDefault,
                lastModified: new Date().toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                }).replace(/\./g, '.').replace(/\s/g, ' '),
                modifiedBy: '관리자' // 실제로는 로그인된 사용자 정보
            };
            setPrompts(prev => [...prev, newPrompt]);
            toast.success('프롬프트 추가 완료', `"${formData.name}" 프롬프트가 성공적으로 추가되었습니다.`);
        }
        else if (modalMode === 'edit' && editingId) {
            setPrompts(prev => prev.map(prompt => prompt.id === editingId
                ? {
                    ...prompt,
                    name: formData.name,
                    content: formData.content,
                    status: formData.status,
                    isDefault: formData.isDefault,
                    lastModified: new Date().toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    }).replace(/\./g, '.').replace(/\s/g, ' '),
                    modifiedBy: '관리자'
                }
                : prompt));
            toast.success('프롬프트 수정 완료', `"${formData.name}" 프롬프트가 성공적으로 수정되었습니다.`);
        }
        closeModal();
    };
    // 검색 필터링된 데이터
    const filteredData = useMemo(() => {
        let filtered = prompts;
        if (searchTerm) {
            filtered = filtered.filter(prompt => prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prompt.modifiedBy.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        // 정렬 적용
        if (sortColumn) {
            filtered = [...filtered].sort((a, b) => {
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    const comparison = aValue.localeCompare(bValue);
                    return sortDirection === 'asc' ? comparison : -comparison;
                }
                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
                }
                return 0;
            });
        }
        return filtered;
    }, [searchTerm, sortColumn, sortDirection]);
    // 페이지네이션 적용
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage]);
    // 페이지네이션 정보
    const paginationInfo = {
        currentPage,
        totalPages: Math.ceil(filteredData.length / itemsPerPage),
        totalItems: filteredData.length,
        itemsPerPage,
    };
    // 정렬 핸들러
    const handleSort = (column, direction) => {
        setSortColumn(column);
        setSortDirection(direction);
    };
    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // 테이블 컬럼 정의
    const columns = [
        {
            key: 'name',
            label: '기능명',
            sortable: true,
        },
        {
            key: 'lastModified',
            label: '최근 수정일',
            sortable: true,
        },
        {
            key: 'modifiedBy',
            label: '수정자',
            sortable: true,
        },
        {
            key: 'status',
            label: '상태',
            sortable: false,
            render: (value, row) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded", children: value }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: () => openPreviewModal(row), className: "text-gray-500 hover:text-green-600", title: "\uBBF8\uB9AC\uBCF4\uAE30", children: _jsx(FiEye, { size: 18 }) }), _jsx("button", { onClick: () => handleEditPrompt(row), className: "text-gray-500 hover:text-blue-600", title: "\uD3B8\uC9D1", children: _jsx(FiEdit2, { size: 18 }) }), _jsx("button", { onClick: () => openDeleteDialog(row), className: "text-gray-500 hover:text-red-600", title: "\uC0AD\uC81C", children: _jsx(FiTrash2, { size: 18 }) })] })] })),
        },
    ];
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h1", { className: "text-2xl font-semibold", children: "\uD504\uB86C\uD504\uD2B8 \uAD00\uB9AC" }), _jsxs("button", { onClick: openAddModal, className: "flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx(FiPlus, { className: "w-4 h-4 mr-2" }), "\uD504\uB86C\uD504\uD2B8 \uCD94\uAC00"] })] }), _jsx("p", { className: "text-sm text-gray-600 mb-6", children: "\uC5D0\uD2F0\uD1A0\uC2A4 AI \uAE30\uB2A5\uBCC4 \uD504\uB86C\uD504\uD2B8 \uC124\uC815 \uD654\uBA74\uC744 \uD655\uC778\uD558\uACE0 \uC218\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uBCC4\uB3C4\uB85C \uC124\uC815\uD558\uC9C0 \uC54A\uC740 \uACBD\uC6B0, \uC2DC\uC2A4\uD15C \uAE30\uBCF8 \uD504\uB86C\uD504\uD2B8\uAC00 \uC790\uB3D9\uC73C\uB85C \uC801\uC6A9\uB429\uB2C8\uB2E4." }), _jsxs("div", { className: "bg-white rounded-lg border", children: [_jsxs("div", { className: "p-4 flex space-x-4", children: [_jsx("button", { className: "flex items-center justify-center h-10 px-4 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none", children: "\uC804\uCCB4" }), _jsxs("div", { className: "relative flex-grow", children: [_jsx("input", { type: "text", placeholder: "\uAE30\uB2A5\uBA85/\uC218\uC815\uC790 \uAC80\uC0C9", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full h-10 pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center", children: _jsx("svg", { className: "h-5 w-5 text-gray-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z", clipRule: "evenodd" }) }) })] })] }), _jsx(DataTable, { data: paginatedData, columns: columns, pagination: paginationInfo, onPageChange: handlePageChange, onSort: handleSort })] }), _jsxs("div", { className: "bg-gray-100 rounded-lg p-4 mt-6", children: [_jsx("h2", { className: "text-md font-semibold mb-2", children: "\uD504\uB86C\uD504\uD2B8 \uAD00\uB9AC \uC815\uCC45" }), _jsxs("ul", { className: "list-disc pl-5 space-y-1 text-sm text-gray-700", children: [_jsx("li", { children: "\uCEE4\uC2A4\uD140 \uD504\uB86C\uD504\uD2B8\uB97C \uC124\uC815\uD558\uC9C0 \uC54A\uC740 \uAE30\uB2A5\uC740 \uC2DC\uC2A4\uD15C \uAE30\uBCF8 \uD504\uB86C\uD504\uD2B8\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4." }), _jsx("li", { children: "\uD504\uB86C\uD504\uD2B8\uB97C \uC218\uC815\uD558\uC5EC \uC800\uC7A5\uD55C \uACBD\uC6B0, \uD574\uB2F9 \uAE30\uB2A5\uC740 \uCEE4\uC2A4\uD140 \uD504\uB86C\uD504\uD2B8\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4." }), _jsx("li", { children: "\uCD08\uAE30\uD654 \uAE30\uB2A5\uC744 \uD1B5\uD574 \uC5B8\uC81C\uB4E0 \uAE30\uBCF8 \uD504\uB86C\uD504\uD2B8\uB85C \uBCF5\uAD6C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." })] })] }), _jsx(Modal, { isOpen: isModalOpen, onClose: closeModal, title: modalMode === 'add' ? '프롬프트 추가' : '프롬프트 편집', size: "lg", children: _jsxs("div", { className: "space-y-4", children: [_jsx(Input, { label: "\uD504\uB86C\uD504\uD2B8 \uC774\uB984", value: formData.name, onChange: (e) => handleFormChange('name', e.target.value), placeholder: "\uD504\uB86C\uD504\uD2B8 \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694", required: true }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "\uD504\uB86C\uD504\uD2B8 \uB0B4\uC6A9" }), _jsx("textarea", { value: formData.content, onChange: (e) => handleFormChange('content', e.target.value), placeholder: "\uD504\uB86C\uD504\uD2B8 \uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694", rows: 6, className: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none", required: true })] }), _jsx(Select, { label: "\uC0C1\uD0DC", value: formData.status, onChange: (e) => handleFormChange('status', e.target.value), options: statusOptions }), _jsxs("div", { className: "flex justify-end space-x-3 pt-4", children: [_jsx("button", { onClick: closeModal, className: "px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500", children: "\uCDE8\uC18C" }), _jsx("button", { onClick: handleSave, className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500", disabled: !formData.name.trim() || !formData.content.trim(), children: modalMode === 'add' ? '추가' : '저장' })] })] }) }), _jsx(Dialog, { isOpen: isDeleteDialogOpen, onClose: closeDeleteDialog, onConfirm: handleConfirmDelete, title: "\uD504\uB86C\uD504\uD2B8 \uC0AD\uC81C", message: _jsxs("div", { children: [_jsx("p", { className: "mb-2", children: "\uC815\uB9D0\uB85C \uB2E4\uC74C \uD504\uB86C\uD504\uD2B8\uB97C \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?" }), _jsxs("p", { className: "font-semibold text-gray-900", children: ["\"", deleteTargetName, "\""] }), _jsx("p", { className: "mt-2 text-sm text-gray-600", children: "\uC0AD\uC81C\uB41C \uD504\uB86C\uD504\uD2B8\uB294 \uBCF5\uAD6C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." })] }), confirmText: "\uC0AD\uC81C", cancelText: "\uCDE8\uC18C", variant: "danger" }), _jsx(Modal, { isOpen: isPreviewModalOpen, onClose: closePreviewModal, title: "\uD504\uB86C\uD504\uD2B8 \uBBF8\uB9AC\uBCF4\uAE30", size: "lg", children: previewPrompt && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\uD504\uB86C\uD504\uD2B8 \uC774\uB984" }), _jsx("div", { className: "w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900", children: previewPrompt.name })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\uD504\uB86C\uD504\uD2B8 \uB0B4\uC6A9" }), _jsx("div", { className: "w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 whitespace-pre-wrap min-h-[150px] max-h-[300px] overflow-y-auto", children: previewPrompt.content })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\uC0C1\uD0DC" }), _jsx("div", { className: "w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900", children: previewPrompt.status })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\uCD5C\uADFC \uC218\uC815\uC77C" }), _jsx("div", { className: "w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900", children: previewPrompt.lastModified })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\uC218\uC815\uC790" }), _jsx("div", { className: "w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900", children: previewPrompt.modifiedBy })] })] }), _jsx("div", { className: "flex justify-end pt-4", children: _jsx("button", { onClick: closePreviewModal, className: "px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500", children: "\uB2EB\uAE30" }) })] })) })] }));
};
export default PromptManagement;
