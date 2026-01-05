import type { PatientDashboard } from "../types/patients";

export async function fetchPatientDashboard(patientId: string): Promise<PatientDashboard> {
	const res = await fetch(`/api/PatientDashboard/${patientId}/dashboard`, {
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!res.ok) {
		throw new Error("Failed to fetch patient dashboard");
	}

	return res.json();
}
