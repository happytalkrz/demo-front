import { useState, useMemo } from 'react';
import { FiSearch, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import Dialog from '../components/common/Dialog';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import { User, CreateUserData, UpdateUserData } from '../types/user';
import { initialUsers, roleOptions, statusOptions } from '../data/userData';
import { TableColumn } from '../types/common';
import { useToast } from '../hooks/useToast';

const Users = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  // Form states
  const [formData, setFormData] = useState<CreateUserData>({
    name: '',
    email: '',
    role: '일반 사용자',
    status: '활성'
  });
  const [formErrors, setFormErrors] = useState<Partial<CreateUserData>>({});

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
  const columns: TableColumn<User>[] = [
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
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          value === '관리자' ? 'bg-purple-100 text-purple-800' :
          value === '편집자' ? 'bg-blue-100 text-blue-800' :
          'bg-green-100 text-green-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      label: '상태',
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          value === '활성' ? 'bg-green-100 text-green-800' :
          value === '비활성' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'lastLogin',
      label: '마지막 로그인',
      sortable: true,
    },
    {
      key: 'actions',
      label: '관리',
      render: (_, user: User) => (
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => handleEditClick(user)}
            className="text-gray-600 hover:text-blue-600 transition-colors"
            title="편집"
          >
            <FiEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteClick(user)}
            className="text-gray-600 hover:text-red-600 transition-colors"
            title="삭제"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  // Form validation
  const validateForm = (data: CreateUserData): Partial<CreateUserData> => {
    const errors: Partial<CreateUserData> = {};

    if (!data.name.trim()) {
      errors.name = '이름을 입력해주세요.';
    }

    if (!data.email.trim()) {
      errors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
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

  const handleEditClick = (user: User) => {
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

  const handleDeleteClick = (user: User) => {
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

    const newUser: User = {
      ...formData,
      id: Math.max(...users.map(u => u.id)) + 1,
      lastLogin: '아직 로그인하지 않음',
    };

    setUsers([...users, newUser]);
    setIsAddModalOpen(false);
    toast.success('사용자 추가 완료', `${newUser.name}님이 성공적으로 추가되었습니다.`);
  };

  const handleEditSubmit = () => {
    if (!editingUser) return;

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

    const updatedUsers = users.map(user =>
      user.id === editingUser.id
        ? { ...user, ...formData }
        : user
    );

    setUsers(updatedUsers);
    setIsEditModalOpen(false);
    setEditingUser(null);
    toast.success('사용자 수정 완료', `${formData.name}님의 정보가 성공적으로 수정되었습니다.`);
  };

  const handleDeleteConfirm = () => {
    if (!deletingUser) return;

    const updatedUsers = users.filter(user => user.id !== deletingUser.id);
    setUsers(updatedUsers);
    setIsDeleteDialogOpen(false);
    toast.success('사용자 삭제 완료', `${deletingUser.name}님이 성공적으로 삭제되었습니다.`);
    setDeletingUser(null);
  };

  const handleFormChange = (field: keyof CreateUserData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">사용자 관리</h1>
        <button
          onClick={handleAddClick}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          사용자 추가
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select
          label="역할"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          options={[{ value: '', label: '모든 역할' }, ...roleOptions]}
        />
        <Select
          label="상태"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[{ value: '', label: '모든 상태' }, ...statusOptions]}
        />
        <div className="md:col-span-2">
          <Input
            label="검색"
            placeholder="이름 또는 이메일로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<FiSearch className="w-4 h-4 text-gray-400" />}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow">
        <DataTable
          data={filteredUsers}
          columns={columns}
        />
      </div>

      {/* Results info */}
      <div className="text-sm text-gray-700">
        총 <span className="font-medium">{filteredUsers.length}</span>명의 사용자
        {searchTerm || roleFilter || statusFilter ?
          ` (전체 ${users.length}명 중)` : ''
        }
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="사용자 추가"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="이름"
            placeholder="사용자 이름을 입력하세요"
            value={formData.name}
            onChange={(e) => handleFormChange('name', e.target.value)}
            error={formErrors.name}
          />
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요"
            value={formData.email}
            onChange={(e) => handleFormChange('email', e.target.value)}
            error={formErrors.email}
          />
          <Select
            label="역할"
            value={formData.role}
            onChange={(e) => handleFormChange('role', e.target.value)}
            options={roleOptions}
          />
          <Select
            label="상태"
            value={formData.status}
            onChange={(e) => handleFormChange('status', e.target.value)}
            options={statusOptions}
          />
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleAddSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              추가
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingUser(null);
        }}
        title="사용자 수정"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="이름"
            placeholder="사용자 이름을 입력하세요"
            value={formData.name}
            onChange={(e) => handleFormChange('name', e.target.value)}
            error={formErrors.name}
          />
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요"
            value={formData.email}
            onChange={(e) => handleFormChange('email', e.target.value)}
            error={formErrors.email}
          />
          <Select
            label="역할"
            value={formData.role}
            onChange={(e) => handleFormChange('role', e.target.value)}
            options={roleOptions}
          />
          <Select
            label="상태"
            value={formData.status}
            onChange={(e) => handleFormChange('status', e.target.value)}
            options={statusOptions}
          />
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => {
                setIsEditModalOpen(false);
                setEditingUser(null);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleEditSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              수정
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Dialog */}
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setDeletingUser(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="사용자 삭제"
        message={
          deletingUser ? (
            <div>
              <p className="mb-2">다음 사용자를 삭제하시겠습니까?</p>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="font-medium">{deletingUser.name}</p>
                <p className="text-sm text-gray-600">{deletingUser.email}</p>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                이 작업은 되돌릴 수 없습니다.
              </p>
            </div>
          ) : null
        }
        confirmText="삭제"
        cancelText="취소"
        variant="danger"
      />
    </div>
  );
};

export default Users;