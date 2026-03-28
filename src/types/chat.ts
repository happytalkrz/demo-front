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
  title: string;
  date: string;
  time: string;
  counselor: string;
  status: 'ongoing' | 'completed' | 'pending';
  dialogue: ChatMessage[];
  summary?: ChatSummary;
} 