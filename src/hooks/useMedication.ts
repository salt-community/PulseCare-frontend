import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { fetchPatientMedications, createMedication, updateMedication, deleteMedication } from "../lib/api/medicationApi";
import type { CreateMedicationDto, UpdateMedicationDto, Medication } from "../lib/types/medication";

export function usePatientMedications(patientId: string) {
	const { getToken } = useAuth();

	return useQuery<Medication[]>({
		queryKey: ["medications", patientId],
		queryFn: async () => {
			const token = await getToken({ template: "pulsecare-jwt-template" });
			if (!token) throw new Error("No auth token");
			return fetchPatientMedications(patientId, token);
		},
		enabled: Boolean(patientId)
	});
}

export function useCreateMedication(patientId: string) {
	const { getToken } = useAuth();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (dto: CreateMedicationDto) => {
			const token = await getToken({ template: "pulsecare-jwt-template" });
			if (!token) throw new Error("No auth token");
			return createMedication(patientId, dto, token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["patient-overview", patientId] });
		}
	});
}

export function useUpdateMedication(patientId: string) {
	const { getToken } = useAuth();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ medicationId, dto }: { medicationId: string; dto: UpdateMedicationDto }) => {
			const token = await getToken({ template: "pulsecare-jwt-template" });
			if (!token) throw new Error("No auth token");
			return updateMedication(medicationId, dto, token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["patient-overview", patientId] });
		}
	});
}

export function useDeleteMedication(patientId: string) {
	const { getToken } = useAuth();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (medicationId: string) => {
			const token = await getToken({ template: "pulsecare-jwt-template" });
			if (!token) throw new Error("No auth token");
			return deleteMedication(medicationId, token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["patient-overview", patientId] });
		}
	});
}
