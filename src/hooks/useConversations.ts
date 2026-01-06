import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getConversations, startConversation, } from "../lib/api/conversationApi";
import type { Conversation, StartConversationRequest, StartConversationResponse } from "../lib/types/conversation";
import { useAuth } from "@clerk/clerk-react";

export function useConversations(options: { role: "patient" | "doctor"; userId: string }) {
    const queryClient = useQueryClient();
    const { getToken } = useAuth();

    const safeGetToken = async () => {
        const jwt = await getToken();
        if (!jwt) throw new Error("No auth token available");
        return jwt;
    };

    const conversationsQuery = useQuery({
        queryKey: ["conversations", options.role, options.userId],
        queryFn: () => getConversations(options.role, options.userId, safeGetToken),
        staleTime: 1000 * 60,
    });

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
                queryKey: ["conversations", options.role, options.userId]
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