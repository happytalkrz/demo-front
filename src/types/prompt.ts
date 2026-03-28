export interface Prompt {
  id: number;
  name: string;
  content: string;
  lastModified: string;
  modifiedBy: string;
  status: '기본 프롬프트 사용 중' | '커스텀 프롬프트 사용 중';
  isDefault: boolean;
}

export interface CreatePromptData {
  name: string;
  content: string;
  status: Prompt['status'];
  isDefault: boolean;
}

export interface UpdatePromptData extends CreatePromptData {
  id: number;
  lastModified: string;
  modifiedBy: string;
}