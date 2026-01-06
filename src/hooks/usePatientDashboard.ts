import { useQuery } from "@tanstack/react-query";
import { fetchPatientDashboard } from "../lib/api/patientApi";
import type { PatientDashboard } from "../lib/types/patients";
import { useAuth } from "@clerk/clerk-react";

export const usePatientDashboard = () => {
	const { getToken, userId } = useAuth();

	return useQuery<PatientDashboard>({
		queryKey: ["patientDashboard", userId],
		enabled: !!userId,
		queryFn: async () => {
			const token = await getToken({ template: "pulsecare-jwt-template" });
			if (!token) throw new Error("No auth token available");
			return fetchPatientDashboard(token);
		},
		staleTime: 1000 * 60
	});
};
