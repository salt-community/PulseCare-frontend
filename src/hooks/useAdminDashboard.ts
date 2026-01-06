import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";

export function useAdminDashboard() {
	const { userId, getToken } = useAuth();

	return useQuery({
		enabled: !!userId,
		queryKey: ["adminDashboard", userId],
		queryFn: async () => {
			const token = await getToken({ template: "pulsecare-jwt-template" });

			const res = await fetch("/api/AdminDashboard", {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (!res.ok) {
				throw new Error("Failed to load admin dashboard");
			}

			return res.json();
		},
		refetchInterval: 300000,
		refetchIntervalInBackground: false
	});
}
