import { createContext, useContext, useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { getSignalRConnection } from "../lib/signalr/signalRClient";
import { useQueryClient } from "@tanstack/react-query";
import type { Message, Conversation } from "../lib/types/conversation";

type ChatContextType = {
	connection: signalR.HubConnection | null;
	activeConversationId: string | null;
	setActiveConversation: (id: string | null) => void;
};

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({
	token,
	role,
	userId,
	children
}: {
	token: () => Promise<string>;
	role: "patient" | "doctor";
	userId: string;
	children: React.ReactNode;
}) {
	const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
	const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
	const queryClient = useQueryClient();

	const connectionStartedRef = useRef(false);
	const activeIdRef = useRef<string | null>(null);

	const setActiveConversation = (id: string | null) => {
		activeIdRef.current = id;
		setActiveConversationId(id);
	};

	useEffect(() => {
		if (connection || connectionStartedRef.current) return;
		connectionStartedRef.current = true;

		const conn = getSignalRConnection(token);
		const start = async () => {
			try {
				await conn.start();
				setConnection(conn);
			} catch (err) {
				connectionStartedRef.current = false;
			}
		};
		start();
	}, [role, userId]);

	useEffect(() => {
		if (!connection) return;

		const handleReceive = (message: Message) => {
			queryClient.setQueryData(["messages", message.conversationId], (old: Message[] = []) => {
				const exists = old.find(m => m.id === message.id);
				if (exists) return old;
				return [...old, message];
			});

			const cacheKey = ["conversations", role, userId];
			queryClient.setQueryData(cacheKey, (oldConvs: Conversation[] | undefined) => {
				if (!oldConvs) return undefined;

				return oldConvs.map(conv => {
					if (conv.id === message.conversationId) {
						const isChatOpen = conv.id === activeIdRef.current;
						const isIncoming = (role === "doctor" && message.fromPatient) || (role === "patient" && !message.fromPatient);

						let newUnread = conv.unreadCount || 0;

						if (isIncoming && !isChatOpen) {
							newUnread += 1;
						} else if (isChatOpen) {
							newUnread = 0;
						}

						return {
							...conv,
							latestMessage: message,
							unreadCount: newUnread
						};
					}
					return conv;
				});
			});

			queryClient.invalidateQueries({ queryKey: cacheKey });
		};

		connection.on("ReceiveMessage", handleReceive);
		return () => {
			connection.off("ReceiveMessage");
		};
	}, [connection, role, userId, queryClient]);

	return <ChatContext.Provider value={{ connection, activeConversationId, setActiveConversation }}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
	const ctx = useContext(ChatContext);
	if (!ctx) throw new Error("useChatContext error");
	return ctx;
}
