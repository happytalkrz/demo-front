import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { FiSearch, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import Dialog from '../components/common/Dialog';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import { initialUsers, roleOptions, statusOptions } from '../data/userData';
import { useToast } from '../hooks/useToast';
const Users = () => {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    // Dialog states
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deletingUser, setDeletingUser] = useState(null);
    // Form states
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '일반 사용자',
        status: '활성'
    });
    const [formErrors, setFormErrors] = useState({});
    const toast = useToast();
    // Filter and search users
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = searchTerm === '' ||
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = roleFilter === '' || user.role === roleFilter;
            const matchesStatus = statusFilter === '' || user.status === statusFilter;
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [users, searchTerm, roleFilter, statusFilter]);
    // Table columns
    const columns = [
        {
            key: 'id',
            label: 'ID',
            sortable: true,
        },
        {
            key: 'name',
            label: '이름',
            sortable: true,
        },
        {
            key: 'email',
            label: '이메일',
            sortable: true,
        },
        {
            key: 'role',
            label: '역할',
            sortable: true,
            render: (value) => (_jsx("span", { className: `px-2 py-1 text-xs font-semibold rounded-full ${value === '관리자' ? 'bg-purple-100 text-purple-800' :
                    value === '편집자' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'}`, children: value })),
        },
        {
            key: 'status',
            label: '상태',
            sortable: true,
            render: (value) => (_jsx("span", { className: `px-2 py-1 text-xs font-semibold rounded-full ${value === '활성' ? 'bg-green-100 text-green-800' :
                    value === '비활성' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`, children: value })),
        },
        {
            key: 'lastLogin',
            label: '마지막 로그인',
            sortable: true,
        },
        {
            key: 'actions',
            label: '관리',
            render: (_, user) => (_jsxs("div", { className: "flex items-center justify-end space-x-2", children: [_jsx("button", { onClick: () => handleEditClick(user), className: "text-gray-600 hover:text-blue-600 transition-colors", title: "\uD3B8\uC9D1", children: _jsx(FiEdit, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => handleDeleteClick(user), className: "text-gray-600 hover:text-red-600 transition-colors", title: "\uC0AD\uC81C", children: _jsx(FiTrash2, { className: "w-4 h-4" }) })] })),
        },
    ];
    // Form validation
    const validateForm = (data) => {
        const errors = {};
        if (!data.name.trim()) {
            errors.name = '이름을 입력해주세요.';
        }
        if (!data.email.trim()) {
            errors.email = '이메일을 입력해주세요.';
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = '올바른 이메일 형식을 입력해주세요.';
        }
        return errors;
    };
    // Event handlers
    const handleAddClick = () => {
        setFormData({
            name: '',
            email: '',
            role: '일반 사용자',
            status: '활성'
        });
        setFormErrors({});
        setIsAddModalOpen(true);
    };
    const handleEditClick = (user) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        });
        setFormErrors({});
        setIsEditModalOpen(true);
    };
    const handleDeleteClick = (user) => {
        setDeletingUser(user);
        setIsDeleteDialogOpen(true);
    };
    const handleAddSubmit = () => {
        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        // Check for duplicate email
        if (users.some(user => user.email === formData.email)) {
            setFormErrors({ email: '이미 등록된 이메일입니다.' });
            return;
        }
        const newUser = {
            ...formData,
            id: Math.max(...users.map(u => u.id)) + 1,
            lastLogin: '아직 로그인하지 않음',
        };
        setUsers([...users, newUser]);
        setIsAddModalOpen(false);
        toast.success('사용자 추가 완료', `${newUser.name}님이 성공적으로 추가되었습니다.`);
    };
    const handleEditSubmit = () => {
        if (!editingUser)
            return;
        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        // Check for duplicate email (excluding current user)
        if (users.some(user => user.email === formData.email && user.id !== editingUser.id)) {
            setFormErrors({ email: '이미 등록된 이메일입니다.' });
            return;
        }
        const updatedUsers = users.map(user => user.id === editingUser.id
            ? { ...user, ...formData }
            : user);
        setUsers(updatedUsers);
        setIsEditModalOpen(false);
        setEditingUser(null);
        toast.success('사용자 수정 완료', `${formData.name}님의 정보가 성공적으로 수정되었습니다.`);
    };
    const handleDeleteConfirm = () => {
        if (!deletingUser)
            return;
        const updatedUsers = users.filter(user => user.id !== deletingUser.id);
        setUsers(updatedUsers);
        setIsDeleteDialogOpen(false);
        toast.success('사용자 삭제 완료', `${deletingUser.name}님이 성공적으로 삭제되었습니다.`);
        setDeletingUser(null);
    };
    const handleFormChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (formErrors[field]) {
            setFormErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: "\uC0AC\uC6A9\uC790 \uAD00\uB9AC" }), _jsxs("button", { onClick: handleAddClick, className: "inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors", children: [_jsx(FiPlus, { className: "w-4 h-4 mr-2" }), "\uC0AC\uC6A9\uC790 \uCD94\uAC00"] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx(Select, { label: "\uC5ED\uD560", value: roleFilter, onChange: (e) => setRoleFilter(e.target.value), options: [{ value: '', label: '모든 역할' }, ...roleOptions] }), _jsx(Select, { label: "\uC0C1\uD0DC", value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), options: [{ value: '', label: '모든 상태' }, ...statusOptions] }), _jsx("div", { className: "md:col-span-2", children: _jsx(Input, { label: "\uAC80\uC0C9", placeholder: "\uC774\uB984 \uB610\uB294 \uC774\uBA54\uC77C\uB85C \uAC80\uC0C9", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), leftIcon: _jsx(FiSearch, { className: "w-4 h-4 text-gray-400" }) }) })] }), _jsx("div", { className: "bg-white rounded-lg shadow", children: _jsx(DataTable, { data: filteredUsers, columns: columns }) }), _jsxs("div", { className: "text-sm text-gray-700", children: ["\uCD1D ", _jsx("span", { className: "font-medium", children: filteredUsers.length }), "\uBA85\uC758 \uC0AC\uC6A9\uC790", searchTerm || roleFilter || statusFilter ?
                        ` (전체 ${users.length}명 중)` : ''] }), _jsx(Modal, { isOpen: isAddModalOpen, onClose: () => setIsAddModalOpen(false), title: "\uC0AC\uC6A9\uC790 \uCD94\uAC00", size: "md", children: _jsxs("div", { className: "space-y-4", children: [_jsx(Input, { label: "\uC774\uB984", placeholder: "\uC0AC\uC6A9\uC790 \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694", value: formData.name, onChange: (e) => handleFormChange('name', e.target.value), error: formErrors.name }), _jsx(Input, { label: "\uC774\uBA54\uC77C", type: "email", placeholder: "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD558\uC138\uC694", value: formData.email, onChange: (e) => handleFormChange('email', e.target.value), error: formErrors.email }), _jsx(Select, { label: "\uC5ED\uD560", value: formData.role, onChange: (e) => handleFormChange('role', e.target.value), options: roleOptions }), _jsx(Select, { label: "\uC0C1\uD0DC", value: formData.status, onChange: (e) => handleFormChange('status', e.target.value), options: statusOptions }), _jsxs("div", { className: "flex justify-end space-x-3 pt-4", children: [_jsx("button", { onClick: () => setIsAddModalOpen(false), className: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors", children: "\uCDE8\uC18C" }), _jsx("button", { onClick: handleAddSubmit, className: "px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors", children: "\uCD94\uAC00" })] })] }) }), _jsx(Modal, { isOpen: isEditModalOpen, onClose: () => {
                    setIsEditModalOpen(false);
                    setEditingUser(null);
                }, title: "\uC0AC\uC6A9\uC790 \uC218\uC815", size: "md", children: _jsxs("div", { className: "space-y-4", children: [_jsx(Input, { label: "\uC774\uB984", placeholder: "\uC0AC\uC6A9\uC790 \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694", value: formData.name, onChange: (e) => handleFormChange('name', e.target.value), error: formErrors.name }), _jsx(Input, { label: "\uC774\uBA54\uC77C", type: "email", placeholder: "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD558\uC138\uC694", value: formData.email, onChange: (e) => handleFormChange('email', e.target.value), error: formErrors.email }), _jsx(Select, { label: "\uC5ED\uD560", value: formData.role, onChange: (e) => handleFormChange('role', e.target.value), options: roleOptions }), _jsx(Select, { label: "\uC0C1\uD0DC", value: formData.status, onChange: (e) => handleFormChange('status', e.target.value), options: statusOptions }), _jsxs("div", { className: "flex justify-end space-x-3 pt-4", children: [_jsx("button", { onClick: () => {
                                        setIsEditModalOpen(false);
                                        setEditingUser(null);
                                    }, className: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors", children: "\uCDE8\uC18C" }), _jsx("button", { onClick: handleEditSubmit, className: "px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors", children: "\uC218\uC815" })] })] }) }), _jsx(Dialog, { isOpen: isDeleteDialogOpen, onClose: () => {
                    setIsDeleteDialogOpen(false);
                    setDeletingUser(null);
                }, onConfirm: handleDeleteConfirm, title: "\uC0AC\uC6A9\uC790 \uC0AD\uC81C", message: deletingUser ? (_jsxs("div", { children: [_jsx("p", { className: "mb-2", children: "\uB2E4\uC74C \uC0AC\uC6A9\uC790\uB97C \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?" }), _jsxs("div", { className: "bg-gray-50 p-3 rounded-md", children: [_jsx("p", { className: "font-medium", children: deletingUser.name }), _jsx("p", { className: "text-sm text-gray-600", children: deletingUser.email })] }), _jsx("p", { className: "mt-2 text-sm text-gray-600", children: "\uC774 \uC791\uC5C5\uC740 \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." })] })) : null, confirmText: "\uC0AD\uC81C", cancelText: "\uCDE8\uC18C", variant: "danger" })] }));
};
export default Users;
