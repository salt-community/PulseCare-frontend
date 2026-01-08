export interface Message {
    id: string;
    subject: string;
    content: string;
    date: string;
    read: boolean;
    fromPatient: boolean;
    conversationId: string;
}

export interface Conversation {
    id: string;
    patientId: string;
    doctorId: string;
    latestMessage: Message | null;
    unreadCount: number;
}

export interface StartConversationRequest {
    patientId: string | null;
    doctorId: string | null;
    subject: string;
    content: string;
    fromPatient: boolean;
}

export interface StartConversationResponse {
    conversationId: string;
    message: Message;
}
