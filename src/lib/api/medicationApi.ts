import type { Medication, CreateMedicationDto, UpdateMedicationDto } from "../types/medication";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchPatientMedications(patientId: string, token: string): Promise<Medication[]> {
	const res = await fetch(`${API_BASE_URL}/medications/${patientId}`, {
		headers: { Authorization: `Bearer ${token}` }
	});
	if (!res.ok) throw new Error("Failed to fetch medications");
	return res.json();
}

export async function createMedication(patientId: string, dto: CreateMedicationDto, token: string): Promise<Medication> {
	const res = await fetch(`${API_BASE_URL}/medications/${patientId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body: JSON.stringify(dto)
	});
	if (!res.ok) throw new Error("Failed to create medication");
	return res.json();
}

export async function updateMedication(medicationId: string, dto: UpdateMedicationDto, token: string): Promise<Medication> {
	const res = await fetch(`${API_BASE_URL}/medications/${medicationId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body: JSON.stringify(dto)
	});
	if (!res.ok) throw new Error("Failed to update medication");
	return res.json();
}

export async function deleteMedication(medicationId: string, token: string): Promise<void> {
	const res = await fetch(`${API_BASE_URL}/medications/${medicationId}`, {
		method: "DELETE",
		headers: { Authorization: `Bearer ${token}` }
	});
	if (!res.ok) throw new Error("Failed to delete medication");
}
