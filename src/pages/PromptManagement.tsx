import { useState, useMemo } from 'react';
import { FiEdit2, FiEye, FiPlus, FiTrash2 } from 'react-icons/fi';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import Dialog from '../components/common/Dialog';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import { useToast } from '../hooks/useToast';
import { Prompt, CreatePromptData } from '../types/prompt';
import { TableColumn, PaginationInfo } from '../types/common';
import { initialPrompts, statusOptions } from '../data/promptData';

type ModalMode = 'add' | 'edit';

const PromptManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof Prompt | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('add');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Prompt | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewPrompt, setPreviewPrompt] = useState<Prompt | null>(null);
  const [formData, setFormData] = useState<CreatePromptData>({
    name: '',
    content: '',
    status: '기본 프롬프트 사용 중',
    isDefault: false
  });

  const toast = useToast();
  const itemsPerPage = 10;

  const formatTimestamp = () =>
    new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\s/g, ' ');

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

  const openEditModal = (prompt: Prompt) => {
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

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      setPrompts(prev => prev.filter(prompt => prompt.id !== deleteTarget.id));
      toast.success('프롬프트 삭제 완료', `"${deleteTarget.name}" 프롬프트가 성공적으로 삭제되었습니다.`);
      setIsDeleteDialogOpen(false);
      setDeleteTarget(null);
    }
  };

  const handleFormChange = (field: keyof CreatePromptData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.content.trim()) return;

    const timestamp = formatTimestamp();
    const updatedFormData = { ...formData, lastModified: timestamp, modifiedBy: '관리자' };

    if (modalMode === 'add') {
      const newPrompt: Prompt = {
        id: Math.max(...prompts.map(p => p.id)) + 1,
        ...updatedFormData,
        isDefault: formData.isDefault
      };
      setPrompts(prev => [...prev, newPrompt]);
      toast.success('프롬프트 추가 완료', `"${formData.name}" 프롬프트가 성공적으로 추가되었습니다.`);
    } else if (modalMode === 'edit' && editingId) {
      setPrompts(prev => prev.map(prompt =>
        prompt.id === editingId ? { ...prompt, ...updatedFormData, isDefault: formData.isDefault } : prompt
      ));
      toast.success('프롬프트 수정 완료', `"${formData.name}" 프롬프트가 성공적으로 수정되었습니다.`);
    }

    setIsModalOpen(false);
    setEditingId(null);
  };

  // 검색 필터링된 데이터
  const filteredData = useMemo(() => {
    let filtered = prompts;

    if (searchTerm) {
      filtered = filtered.filter(prompt =>
        prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.modifiedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
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
  const paginationInfo: PaginationInfo = {
    currentPage,
    totalPages: Math.ceil(filteredData.length / itemsPerPage),
    totalItems: filteredData.length,
    itemsPerPage,
  };

  // 정렬 핸들러
  const handleSort = (column: keyof Prompt, direction: 'asc' | 'desc') => {
    setSortColumn(column);
    setSortDirection(direction);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 테이블 컬럼 정의
  const columns: TableColumn<Prompt>[] = [
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
      render: (value: string, row: Prompt) => (
        <div className="flex items-center justify-between">
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {value}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setPreviewPrompt(row);
                setIsPreviewModalOpen(true);
              }}
              className="text-gray-500 hover:text-green-600"
              title="미리보기"
            >
              <FiEye size={18} />
            </button>
            <button
              onClick={() => openEditModal(row)}
              className="text-gray-500 hover:text-blue-600"
              title="편집"
            >
              <FiEdit2 size={18} />
            </button>
            <button
              onClick={() => {
                setDeleteTarget(row);
                setIsDeleteDialogOpen(true);
              }}
              className="text-gray-500 hover:text-red-600"
              title="삭제"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">프롬프트 관리</h1>
        <button
          onClick={openAddModal}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          프롬프트 추가
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        에티토스 AI 기능별 프롬프트 설정 화면을 확인하고 수정할 수 있습니다. 별도로 설정하지 않은 경우, 시스템 기본 프롬프트가 자동으로 적용됩니다.
      </p>
      
      <div className="bg-white rounded-lg border">
        {/* 검색 영역 */}
        <div className="p-4 flex space-x-4">
          <button className="flex items-center justify-center h-10 px-4 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none">
            전체
          </button>
          
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="기능명/수정자 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* DataTable */}
        <DataTable
          data={paginatedData}
          columns={columns}
          pagination={paginationInfo}
          onPageChange={handlePageChange}
          onSort={handleSort}
        />
      </div>

      {/* 프롬프트 관리 정책 */}
      <div className="bg-gray-100 rounded-lg p-4 mt-6">
        <h2 className="text-md font-semibold mb-2">프롬프트 관리 정책</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          <li>커스텀 프롬프트를 설정하지 않은 기능은 시스템 기본 프롬프트를 사용합니다.</li>
          <li>프롬프트를 수정하여 저장한 경우, 해당 기능은 커스텀 프롬프트를 사용합니다.</li>
          <li>초기화 기능을 통해 언제든 기본 프롬프트로 복구할 수 있습니다.</li>
        </ul>
      </div>

      {/* 추가/편집 Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingId(null);
        }}
        title={modalMode === 'add' ? '프롬프트 추가' : '프롬프트 편집'}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="프롬프트 이름"
            value={formData.name}
            onChange={(e) => handleFormChange('name', e.target.value)}
            placeholder="프롬프트 이름을 입력하세요"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              프롬프트 내용
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleFormChange('content', e.target.value)}
              placeholder="프롬프트 내용을 입력하세요"
              rows={6}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              required
            />
          </div>

          <Select
            label="상태"
            value={formData.status}
            onChange={(e) => handleFormChange('status', e.target.value as Prompt['status'])}
            options={statusOptions}
          />

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditingId(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!formData.name.trim() || !formData.content.trim()}
            >
              {modalMode === 'add' ? '추가' : '저장'}
            </button>
          </div>
        </div>
      </Modal>

      {/* 삭제 확인 Dialog */}
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleConfirmDelete}
        title="프롬프트 삭제"
        message={
          deleteTarget ? (
            <div>
              <p className="mb-2">정말로 다음 프롬프트를 삭제하시겠습니까?</p>
              <p className="font-semibold text-gray-900">"{deleteTarget.name}"</p>
              <p className="mt-2 text-sm text-gray-600">삭제된 프롬프트는 복구할 수 없습니다.</p>
            </div>
          ) : null
        }
        confirmText="삭제"
        cancelText="취소"
        variant="danger"
      />

      {/* 미리보기 Modal */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setPreviewPrompt(null);
        }}
        title="프롬프트 미리보기"
        size="lg"
      >
        {previewPrompt && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                프롬프트 이름
              </label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900">
                {previewPrompt.name}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                프롬프트 내용
              </label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 whitespace-pre-wrap min-h-[150px] max-h-[300px] overflow-y-auto">
                {previewPrompt.content}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상태
              </label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900">
                {previewPrompt.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  최근 수정일
                </label>
                <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900">
                  {previewPrompt.lastModified}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  수정자
                </label>
                <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900">
                  {previewPrompt.modifiedBy}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  setIsPreviewModalOpen(false);
                  setPreviewPrompt(null);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PromptManagement; 