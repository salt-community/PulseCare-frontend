import type { PatientDashboard } from "../types/patients";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchPatientDashboard(token: string): Promise<PatientDashboard> {
	const res = await fetch(`${API_BASE_URL}/PatientDashboard/dashboard`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	});

	if (!res.ok) {
		throw new Error("Failed to fetch patient dashboard");
	}

	return res.json();
}

export interface PatientDto {
	id: string;
	name: string;
	email: string;
	phone: string;
	conditions: string[];
}

export const patientApi = {
	// GET /api/patients
	getAllPatients: async (token: string): Promise<PatientDto[]> => {
		const response = await fetch(`${API_BASE_URL}/patients`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		if (!response.ok) throw new Error("Failed to fetch patients");
		return response.json();
	}
};
