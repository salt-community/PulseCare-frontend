import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { healthStatApi, type CreateHealthStatRequest, type UpdateHealthStatRequest } from "../lib/api/healthStatApi";

export const useCreateHealthStat = (patientId: string) => {
	const { getToken } = useAuth();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateHealthStatRequest) => {
			const token = await getToken({ template: "pulsecare-jwt-template" });
			if (!token) throw new Error("No auth token");
			return healthStatApi.createHealthStat(patientId, data, token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["patient-overview", patientId] });
		},
		onError: error => {
			console.error("Failed to create health stat:", error);
		}
	});
};

export const useUpdateHealthStat = (patientId: string) => {
	const { getToken } = useAuth();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, data }: { id: string; data: UpdateHealthStatRequest }) => {
			const token = await getToken({ template: "pulsecare-jwt-template" });
			if (!token) throw new Error("No auth token");
			return healthStatApi.updateHealthStat(id, data, token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["patient-overview", patientId] });
		},
		onError: error => {
			console.error("Failed to update health stat:", error);
		}
	});
};

export const useDeleteHealthStat = (patientId: string) => {
	const { getToken } = useAuth();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (healthStatId: string) => {
			const token = await getToken({ template: "pulsecare-jwt-template" });
			if (!token) throw new Error("No auth token");
			return healthStatApi.deleteHealthStat(healthStatId, token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["patient-overview", patientId] });
		},
		onError: error => {
			console.error("Failed to delete health stat:", error);
		}
	});
};
