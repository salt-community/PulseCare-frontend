import { useQuery } from "@tanstack/react-query";
import type { Note } from "../lib/types/patients";
import { useAuth } from "@clerk/clerk-react";
import { fetchNotes } from "../lib/api/notesApi";

export const usePatientNotes = () => {
	const { getToken, userId } = useAuth();

	return useQuery<Note[]>({
		queryKey: ["patientNotes", userId],
		enabled: !!userId,
		queryFn: async () => {
			const token = await getToken({ template: "pulsecare-jwt-template" });
			if (!token) return [];
			return fetchNotes(token);
		},
		staleTime: 1000 * 60
	});
};
