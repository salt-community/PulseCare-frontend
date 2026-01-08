import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentApi } from "../lib/api/appointmentApi";
import { useAuth } from "@clerk/clerk-react";
import type { CreateAppointmentRequest } from "../lib/types";

export const useCreateAppointment = (patientId: string) => {
	const queryClient = useQueryClient();
	const { getToken } = useAuth();

	return useMutation({
		mutationFn: async (appointment: CreateAppointmentRequest) => {
			const token = await getToken({ template: "pulsecare-jwt-template" });
			if (!token) throw new Error("Not authenticated");
			return appointmentApi.createAppointment(appointment, token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["patient-overview", patientId]
			});
		}
	});
};
