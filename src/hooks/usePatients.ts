import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { patientApi } from "../lib/api/patientApi";
import type { UpdatePatientDto } from "../lib/types";

export const patientKeys = {
	all: ["patients"] as const
};

export const usePatients = () => {
	const { getToken } = useAuth();

	return useQuery({
		queryKey: ["patients"],
		queryFn: async () => {
			const token = await getToken();
			if (!token) throw new Error("No authentication token");
			return patientApi.getAllPatients(token);
		}
	});
};

// PUT update patient
export const useUpdatePatient = () => {
	const queryClient = useQueryClient();
	const { getToken } = useAuth();

	return useMutation({
		mutationFn: async ({ id, data }: { id: string; data: UpdatePatientDto }) => {
			const token = await getToken();
			if (!token) throw new Error("Not authenticated");
			return patientApi.updatePatient(id, data, token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: patientKeys.all });
		}
	});
};
