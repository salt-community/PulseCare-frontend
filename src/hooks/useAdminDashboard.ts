import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { fetchAdminDashboard } from "../lib/api/adminDashboardApi";
import type { AdminDashboard } from "../lib/types/adminDashboard";

export function useAdminDashboard() {
	const { userId, getToken } = useAuth();
	return useQuery<AdminDashboard>({
		enabled: !!userId,
		queryKey: ["adminDashboard", userId],
		queryFn: async () => {
			const token = await getToken({ template: "pulsecare-jwt-template" });
			if (!token) throw new Error("No auth token available");
			return fetchAdminDashboard(token);
		},
		refetchInterval: 300000,
		refetchIntervalInBackground: false
	});
}
