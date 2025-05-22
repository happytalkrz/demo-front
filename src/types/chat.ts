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