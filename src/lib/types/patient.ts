import type { Appointment } from "./appointment";
import type { HealthStat } from "./healthStat";
import type { Medication } from "./medication";

export type EmergencyContact = {
	name: string;
	phone: string;
	relationship: string;
};

// DTO for patient list
export type PatientDto = {
	id: string;
	name: string;
	email: string;
	phone?: string;
	conditions: string[];
};

// DTO for patient overview/details
export type PatientOverviewDto = {
	name: string;
	email: string;
	phone?: string;
	dateOfBirth: string;
	createdAt: string;
	bloodType: string;
	medications: Medication[];
	healthStats: HealthStat[];
	appointments: Appointment[];
	conditions: string[];
	allergies: string[];
	emergencyContact?: EmergencyContact;
};

// View model for patient card
export type PatientCardVm = {
	id: string;
	name: string;
	email: string;
	phone: string;
	conditions: string[];
};

// View model for patient details page
export type PatientDetailsVm = PatientOverviewDto & {
	id: string;
	phone: string;
	emergencyContact: EmergencyContact;
};
