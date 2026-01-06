// Patient API Service Layer

const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/patients`;

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
		const response = await fetch(API_BASE, {
			headers: { Authorization: `Bearer ${token}` }
		});
		if (!response.ok) throw new Error("Failed to fetch patients");
		return response.json();
	}
};
