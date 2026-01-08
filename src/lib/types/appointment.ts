// Appointment Type Definitions

export type AppointmentType = "Checkup" | "FollowUp" | "Consultation" | "Lab";
export type AppointmentStatus = "Scheduled" | "Completed" | "Cancelled";

export interface Appointment {
	id: string; // UUID
	date: string; // "2026-01-05T00:00:00"
	time: string; // "14:30"
	type: AppointmentType;
	status: AppointmentStatus;
	patientName: string | null;
	doctorName: string | null;
	reason: string | null;
	notes: string[];
}

export interface CreateAppointmentRequest {
	patientId: string; // UUID
	doctorId: string; // UUID
	date: string; // ISO date "2026-01-05T00:00:00"
	time: string; // "14:30"
	type: AppointmentType;
	reason?: string;
}

export interface UpdateAppointmentRequest {
	date: string; // ISO date
	time: string; // TimeSpan format "14:30:00"
	type: number; // Enum: 0=Checkup, 1=FollowUp, 2=Consultation, 3=Lab
	status: number; // Enum: 0=Scheduled, 1=Completed, 2=Cancelled
	reason?: string;
}

export type CreateNoteRequest = {
	appointmentId: string;
	patientId: string;
};
