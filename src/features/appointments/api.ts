// Appointment API Service Layer

import type { Appointment, CreateAppointmentRequest, UpdateAppointmentRequest } from "./types";

const API_BASE = "http://localhost:5002/api/Appointments";

export const appointmentApi = {
	// GET /api/Appointments
	getAllAppointments: async (): Promise<Appointment[]> => {
		const response = await fetch(API_BASE);
		if (!response.ok) throw new Error("Failed to fetch appointments");
		return response.json();
	},

	// GET /api/Appointments/{patientId}
	getPatientAppointments: async (patientId: string): Promise<Appointment[]> => {
		const response = await fetch(`${API_BASE}/${patientId}`);
		if (!response.ok) throw new Error("Failed to fetch patient appointments");
		return response.json();
	},

	// POST /api/Appointments
	createAppointment: async (appointment: CreateAppointmentRequest): Promise<Appointment> => {
		const response = await fetch(API_BASE, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(appointment)
		});
		if (!response.ok) throw new Error("Failed to create appointment");
		return response.json();
	},

	// PUT /api/Appointments/{id}
	updateAppointment: async (id: string, appointment: UpdateAppointmentRequest): Promise<void> => {
		const response = await fetch(`${API_BASE}/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(appointment)
		});
		if (!response.ok) throw new Error("Failed to update appointment");
	},

	// DELETE /api/Appointments/{id}
	deleteAppointment: async (id: string): Promise<void> => {
		const response = await fetch(`${API_BASE}/${id}`, {
			method: "DELETE"
		});
		if (!response.ok) throw new Error("Failed to delete appointment");
	}
};
