import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { addNote } from "../lib/api/notesApi";
import type { CreateNoteRequest } from "../lib/types";

export const useAddPatientNote = (patientId: string) => {
	const { getToken } = useAuth();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (note: CreateNoteRequest) => {
			const token = await getToken({ template: "pulsecare-jwt-template" });
			if (!token) throw new Error("No auth token");
			return addNote(token, note);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["patient-overview", patientId]
			});
		}
	});
};
