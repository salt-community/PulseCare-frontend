import { useQuery } from "@tanstack/react-query";
import { fetchPatientDashboard } from "../lib/api/patientApi";
import type { PatientDashboard } from "../lib/types/patients";
import { useAuth } from "@clerk/clerk-react";

export const usePatientDashboard = () => {
	const { getToken } = useAuth();

	return useQuery<PatientDashboard>({
		queryKey: ["patientDashboard"],
		queryFn: async () => {
			const token = await getToken();
			if (!token) throw new Error("No auth token available");
			return fetchPatientDashboard(token);
		},
		staleTime: 1000 * 60
	});
};
