import { useMemo, useState } from "react";
import { mockConversations } from "../lib/api/mockData";

export type Message = {
	id: string;
	subject: string;
	content: string;
	date: string;
	read: boolean;
	fromPatient: boolean;
	conversationId: string;
};

export type Conversation = {
	id: string;
	patientId: string;
	doctorId: string;
	messages: Message[];
};

type UseMessagesOptions = { role: "patient"; patientId: string } | { role: "doctor"; doctorId: string };

export function useMessages(options: UseMessagesOptions) {
	const [conversations, setConversations] = useState<Conversation[]>(mockConversations);

	const filtered = useMemo(() => {
		return conversations
			.filter(c => (options.role === "patient" ? c.patientId === options.patientId : c.doctorId === options.doctorId))
			.map(c => ({
				...c,
				messages: [...c.messages].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
			}));
	}, [conversations, options]);

	const unreadCount = useMemo(() => {
		return filtered.reduce((count, conv) => {
			return (
				count +
				conv.messages.filter(m => {
					if (options.role === "patient") {
						return !m.fromPatient && !m.read;
					}
					return m.fromPatient && !m.read;
				}).length
			);
		}, 0);
	}, [filtered, options]);

	const markConversationAsRead = (conversationId: string) => {
		setConversations(prev =>
			prev.map(conv => {
				if (conv.id !== conversationId) return conv;

				return {
					...conv,
					messages: conv.messages.map(m => ({
						...m,
						read: options.role === "patient" ? (!m.fromPatient ? true : m.read) : m.fromPatient ? true : m.read
					}))
				};
			})
		);
	};

	const sendMessage = (input: {
		conversationId?: string;
		subject: string;
		content: string;
		patientId: string;
		doctorId: string;
		sender: "patient" | "doctor";
	}) => {
		const id = `msg-${Date.now()}`;
		const convId = input.conversationId ?? `conv-${Date.now()}`;

		const newMessage: Message = {
			id,
			subject: input.subject,
			content: input.content,
			date: new Date().toISOString(),
			read: false,
			fromPatient: input.sender === "patient",
			conversationId: convId
		};

		setConversations(prev => {
			const existing = prev.find(c => c.id === convId);

			if (existing) {
				return prev.map(c => (c.id === convId ? { ...c, messages: [...c.messages, newMessage] } : c));
			}

			return [
				...prev,
				{
					id: convId,
					patientId: input.patientId,
					doctorId: input.doctorId,
					messages: [newMessage]
				}
			];
		});
	};

	return {
		conversations: filtered,
		unreadCount,
		markConversationAsRead,
		sendMessage
	};
}
