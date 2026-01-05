import { useQuery } from "@tanstack/react-query";
import { fetchPatientDashboard } from "../lib/api/patientApi";
import type { PatientDashboard } from "../lib/types/patients";

export function usePatientDashboard(patientId: string) {
	return useQuery<PatientDashboard>({
		queryKey: ["patientDashboard", patientId],
		queryFn: () => fetchPatientDashboard(patientId),
		enabled: !!patientId,
		staleTime: 1000 * 60
	});
}
