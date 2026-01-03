// TanStack Query Hooks for Appointments

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
	return useQuery({
		queryKey: appointmentKeys.lists(),
		queryFn: appointmentApi.getAllAppointments
	});
};

// GET patient appointments
export const usePatientAppointments = (patientId: string) => {
	return useQuery({
		queryKey: appointmentKeys.patient(patientId),
		queryFn: () => appointmentApi.getPatientAppointments(patientId),
		enabled: !!patientId // Only run if patientId exists
	});
};

// POST create appointment
export const useCreateAppointment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: appointmentApi.createAppointment,
		onSuccess: () => {
			// Invalidate both all appointments and patient-specific queries
			queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
		}
	});
};

// PUT update appointment
export const useUpdateAppointment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateAppointmentRequest }) => appointmentApi.updateAppointment(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
		}
	});
};

// DELETE appointment
export const useDeleteAppointment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: appointmentApi.deleteAppointment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
		}
	});
};
