import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useChatContext } from "../context/ChatContext";
import { getMessages, sendMessage, markAllAsRead } from "../lib/api/messageApi";
import { useAuth, useUser } from "@clerk/clerk-react";
import type { Conversation, Message } from "../lib/types/conversation";

export function useChat(conversationId: string, role: "patient" | "doctor") {
    const { connection, setActiveConversation } = useChatContext();
    const queryClient = useQueryClient();
    const { getToken } = useAuth();
    const { user } = useUser();

    const [isTyping, setIsTyping] = useState(false);
    const lastSentTypingRef = useRef(0);
    const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const safeGetToken = async () => {
        const jwt = await getToken();
        if (!jwt) throw new Error("No auth token available");
        return jwt;
    };

    // 1. SIGNALR: Join/Leave Room + Active Conversation State
    useEffect(() => {
        if (!connection || !conversationId) {
            setActiveConversation(null);
            return;
        }

        setActiveConversation(conversationId);

        connection.invoke("JoinConversation", conversationId)
            .catch(err => console.error("SignalR Join Error:", err));

        return () => {
            setActiveConversation(null);
            connection.invoke("LeaveConversation", conversationId)
                .catch(err => console.error("SignalR Leave Error:", err));
        };
    }, [connection, conversationId, setActiveConversation]);

    // 2. DATA FETCHING
    const messagesQuery = useQuery({
        queryKey: ["messages", conversationId],
        queryFn: () => getMessages(conversationId, safeGetToken),
        enabled: !!conversationId
    });

    // 3. MUTATIONS
    const sendMessageMutation = useMutation({
        mutationFn: (input: { subject: string; content: string; fromPatient: boolean }) =>
            sendMessage(conversationId, input, safeGetToken),
        onSuccess: (newMessage) => {

            queryClient.setQueryData(["messages", conversationId], (old: Message[] = []) => {
                if (old.some(m => m.id === newMessage.id)) return old;
                return [...old, newMessage];
            });

            queryClient.setQueryData(["conversations", role], (old: Conversation[] | undefined) => {
                if (!old) return [];

                return old.map(c => {
                    if (c.id === conversationId) {

                        return {
                            ...c,
                            latestMessage: newMessage,
                            unreadCount: role === "doctor" ? 0 : c.unreadCount
                        };
                    }
                    return c;
                });
            });

            queryClient.invalidateQueries({
                queryKey: ["conversations", role],
                refetchType: "none"
            });
        }
    });

    const markAsReadMutation = useMutation({
        mutationFn: () => markAllAsRead(conversationId, safeGetToken),
        onSuccess: () => {
            queryClient.setQueryData(["conversations", role], (old: Conversation[] = []) => {
                return old.map(c => c.id === conversationId ? { ...c, unreadCount: 0 } : c);
            });
        }
    });

    useEffect(() => {
        const messages = messagesQuery.data;
        if (!messages || messages.length === 0 || !conversationId) return;

        const lastMessage = messages[messages.length - 1];
        const isRecipient = (role === "patient" && !lastMessage.fromPatient) ||
            (role === "doctor" && lastMessage.fromPatient);

        if (isRecipient && !lastMessage.read) {
            markAsReadMutation.mutate();
        }
    }, [messagesQuery.data, conversationId, role]);

    const sendTyping = () => {
        const now = Date.now();
        if (now - lastSentTypingRef.current > 1000) {
            connection?.invoke("Typing", conversationId, user?.id);
            lastSentTypingRef.current = now;
        }
    };

    useEffect(() => {
        if (!connection) return;

        const handleTyping = (userId: string) => {
            if (userId === user?.id) return;

            setIsTyping(true);
            if (typingRef.current) clearTimeout(typingRef.current);
            typingRef.current = setTimeout(() => setIsTyping(false), 2000);
        };

        connection.on("Typing", handleTyping);
        return () => {
            connection.off("Typing", handleTyping);
        };
    }, [connection, user?.id]);

    return {
        messages: messagesQuery.data ?? [],
        isLoading: messagesQuery.isLoading,
        sendMessage: sendMessageMutation.mutate,
        markAsRead: markAsReadMutation.mutate,
        isTyping,
        sendTyping
    };
}