// Appointment API Service Layer

import type { Appointment, CreateAppointmentRequest, UpdateAppointmentRequest } from "./types";

const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/Appointments`;

export const appointmentApi = {
	// GET /api/Appointments
	getAllAppointments: async (token: string): Promise<Appointment[]> => {
		const response = await fetch(API_BASE, {
			headers: { Authorization: `Bearer ${token}` }
		});
		if (!response.ok) throw new Error("Failed to fetch appointments");
		return response.json();
	},

	// GET /api/Appointments/{patientId}
	getPatientAppointments: async (patientId: string, token: string): Promise<Appointment[]> => {
		const response = await fetch(`${API_BASE}/${patientId}`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		if (!response.ok) throw new Error("Failed to fetch patient appointments");
		return response.json();
	},

	// POST /api/Appointments
	createAppointment: async (appointment: CreateAppointmentRequest, token: string): Promise<Appointment> => {
		const response = await fetch(API_BASE, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify(appointment)
		});
		if (!response.ok) throw new Error("Failed to create appointment");
		return response.json();
	},

	// PUT /api/Appointments/{id}
	updateAppointment: async (id: string, appointment: UpdateAppointmentRequest, token: string): Promise<void> => {
		const response = await fetch(`${API_BASE}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify(appointment)
		});
		if (!response.ok) throw new Error("Failed to update appointment");
	},

	// DELETE /api/Appointments/{id}
	deleteAppointment: async (id: string, token: string): Promise<void> => {
		const response = await fetch(`${API_BASE}/${id}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` }
		});
		if (!response.ok) throw new Error("Failed to delete appointment");
	}
};
