// Health Stat API Service Layer

import type { HealthStat } from "../types/healthStat";

const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/healthstats`;

export type CreateHealthStatRequest = {
	type: string;
	value: string;
	unit: string;
	status: string;
};

export type UpdateHealthStatRequest = {
	type: string;
	value: string;
	unit: string;
	date: string;
	status: string;
};

export const healthStatApi = {
	// POST /api/healthstats/{patientId}
	createHealthStat: async (patientId: string, healthStat: CreateHealthStatRequest, token: string): Promise<HealthStat> => {
		const response = await fetch(`${API_BASE}/${patientId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify(healthStat)
		});
		if (!response.ok) throw new Error("Failed to create health stat");
		return response.json();
	},

	// PATCH /api/healthstats/{id}
	updateHealthStat: async (id: string, healthStat: UpdateHealthStatRequest, token: string): Promise<HealthStat> => {
		const response = await fetch(`${API_BASE}/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify(healthStat)
		});
		if (!response.ok) throw new Error("Failed to update health stat");
		return response.json();
	},

	// DELETE /api/healthstats/{id}
	deleteHealthStat: async (id: string, token: string): Promise<void> => {
		const response = await fetch(`${API_BASE}/${id}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` }
		});
		if (!response.ok) throw new Error("Failed to delete health stat");
	}
};
