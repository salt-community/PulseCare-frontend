// TanStack Query Hooks for Appointments

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { appointmentApi } from "./api";
import type { UpdateAppointmentRequest } from "./types";

export const appointmentKeys = {
	all: ["appointments"] as const,
	lists: () => [...appointmentKeys.all, "list"] as const,
	list: (filters: string) => [...appointmentKeys.lists(), { filters }] as const,
	details: () => [...appointmentKeys.all, "detail"] as const,
	detail: (id: string) => [...appointmentKeys.details(), id] as const,
	patient: (patientId: string) => [...appointmentKeys.all, "patient", patientId] as const
};

// GET all appointments (admin)
export const useAllAppointments = () => {
	const { getToken } = useAuth();

	return useQuery({
		queryKey: appointmentKeys.lists(),
		queryFn: async () => {
			const token = await getToken();
			if (!token) throw new Error("Not authenticated");
			return appointmentApi.getAllAppointments(token);
		}
	});
};

// GET patient appointments
export const usePatientAppointments = (patientId: string) => {
	const { getToken } = useAuth();

	return useQuery({
		queryKey: appointmentKeys.patient(patientId),
		queryFn: async () => {
			const token = await getToken();
			if (!token) throw new Error("Not authenticated");
			return appointmentApi.getPatientAppointments(patientId, token);
		},
		enabled: !!patientId // Only run if patientId exists
	});
};

// POST create appointment
export const useCreateAppointment = () => {
	const queryClient = useQueryClient();
	const { getToken } = useAuth();

	return useMutation({
		mutationFn: async (appointment: any) => {
			const token = await getToken();
			if (!token) throw new Error("Not authenticated");
			return appointmentApi.createAppointment(appointment, token);
		},
		onSuccess: () => {
			// Invalidate both all appointments and patient-specific queries
			queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
		}
	});
};

// PUT update appointment
export const useUpdateAppointment = () => {
	const queryClient = useQueryClient();
	const { getToken } = useAuth();

	return useMutation({
		mutationFn: async ({ id, data }: { id: string; data: UpdateAppointmentRequest }) => {
			const token = await getToken();
			if (!token) throw new Error("Not authenticated");
			return appointmentApi.updateAppointment(id, data, token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
		}
	});
};

// DELETE appointment
export const useDeleteAppointment = () => {
	const queryClient = useQueryClient();
	const { getToken } = useAuth();

	return useMutation({
		mutationFn: async (id: string) => {
			const token = await getToken();
			if (!token) throw new Error("Not authenticated");
			return appointmentApi.deleteAppointment(id, token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
		}
	});
};
