export interface ChatMessage {
  role: 'customer' | 'counselor' | 'chatbot';
  message: string;
}

export interface ChatData {
  title: string;
  dialogue: ChatMessage[];
}

export interface ChatSummary {
  id: number;
  title: string;
  content: {
    mainIssue: string;
    result: string;
    nextAction: string;
  }
}

export interface Consultation {
  id: string;
  customerName: string;
  consultationDate: string;
  status: 'waiting' | 'in_progress' | 'completed' | 'cancelled';
  category: string;
  chatDataIndex: number; // chatData 배열의 인덱스로 연결
  priority: 'high' | 'medium' | 'low';
  summary?: string;
} 