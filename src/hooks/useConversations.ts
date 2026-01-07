import { useMemo, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getConversations, startConversation, } from "../lib/api/conversationApi";
import type { Conversation, StartConversationRequest, StartConversationResponse, Message } from "../lib/types/conversation";
import { useAuth } from "@clerk/clerk-react";
import { useChatContext } from "../context/ChatContext";

export function useConversations(options: { role: "patient" | "doctor" }) {
    const queryClient = useQueryClient();
    const { getToken } = useAuth();
    const { connection } = useChatContext();

    const safeGetToken = async () => {
        const jwt = await getToken();
        if (!jwt) throw new Error("No auth token available");
        return jwt;
    };

    const conversationsQuery = useQuery({
        queryKey: ["conversations", options.role],
        queryFn: () => getConversations(safeGetToken),
        staleTime: 1000 * 60,
    });

    useEffect(() => {
        if (!connection) return;

        const handleNotification = (newMessage: Message) => {
            queryClient.setQueryData(["conversations", options.role], (oldData: Conversation[] | undefined) => {
                if (!oldData) return [];

                return oldData.map(conv => {
                    if (conv.id === newMessage.conversationId) {
                        return {
                            ...conv,
                            latestMessage: newMessage,
                            unreadCount: (conv.unreadCount || 0) + 1
                        };
                    }
                    return conv;
                });
            });
        };

        connection.on("NewMessageNotification", handleNotification);

        return () => {
            connection.off("NewMessageNotification", handleNotification);
        };
    }, [connection, queryClient, options.role]);

    const conversations = useMemo(() => {
        const data = conversationsQuery.data ?? [];
        return [...data].sort((a, b) => {
            const aDate = new Date(a.latestMessage?.date ?? 0).getTime();
            const bDate = new Date(b.latestMessage?.date ?? 0).getTime();
            return bDate - aDate;
        });
    }, [conversationsQuery.data]);

    const unreadCount = useMemo(() => {
        const data = conversationsQuery.data ?? [];
        return data.reduce((sum: number, conv: Conversation) => sum + (Number(conv.unreadCount) || 0), 0);
    }, [conversationsQuery.data]);

    const startConversationMutation = useMutation({
        mutationFn: (input: StartConversationRequest) => startConversation(input, safeGetToken),
        onSuccess: (data: StartConversationResponse) => {
            queryClient.setQueryData(["messages", data.conversationId], [data.message]);

            queryClient.invalidateQueries({
                queryKey: ["conversations", options.role]
            });
        }
    });

    return {
        conversations,
        startConversation: startConversationMutation.mutate,
        unreadCount,
        isLoading: conversationsQuery.isLoading
    };
}