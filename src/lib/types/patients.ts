export interface PatientDashboard {
	patient: Patient;
	healthStats: HealthStats[];
	medications: Medication[];
	appointments: Appointment[];
	notes: Note[];
}

export type HealthStatType = "BloodPressure" | "Glucose" | "Cholesterol" | "HeartRate" | "Weight";

export type HealthStatusType = "Normal" | "Warning" | "Critical";

export interface Patient {
	id: string | null;
	name: string;
	email: string;
	phone: string | null;
	conditions: string[];
}

export interface Note {
	id: string | null;
	title: string;
	doctorName: string;
	date: string;
	content: string;
}

export interface Medication {
	id: string | null;
	name: string | null;
	dosage: string | null;
	frequency: string | null;
	instructions: string | null;
	timesPerDay: number | null;
	startDate: string | null;
}

export interface HealthStats {
	id: string;
	type: HealthStatType;
	value: string;
	unit: string;
	date: string;
	status: HealthStatusType;
}

export interface Appointment {
	id: string | null;
	date: string;
	time: string | null;
	type: string | null;
	status: string | null;
	doctorName: string | null;
	reason: string | null;
	notes: string[];
}
