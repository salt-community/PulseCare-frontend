// Mock data for PulseCare application

export interface User {
	id: string;
	email: string;
	name: string;
	role: "patient" | "admin";
	avatar?: string;
}

export interface Patient {
	id: string;
	name: string;
	email: string;
	phone: string;
	dateOfBirth: string;
	bloodType: string;
	allergies: string[];
	conditions: string[];
	emergencyContact: {
		name: string;
		phone: string;
		relationship: string;
	};
	createdAt: string;
}

export interface Medication {
	id: string;
	name: string;
	dosage: string;
	frequency: string;
	timesPerDay: number;
	startDate: string;
	endDate?: string;
	instructions?: string;
}

export interface Appointment {
	id: string;
	patientId: string;
	patientName: string;
	doctorName: string;
	date: string;
	time: string;
	type: "checkup" | "follow-up" | "consultation" | "lab";
	status: "scheduled" | "completed" | "cancelled";
	notes?: string;
}

export interface HealthStat {
	id: string;
	type: "blood_pressure" | "glucose" | "cholesterol" | "heart_rate" | "weight";
	value: string;
	unit: string;
	date: string;
	status: "normal" | "warning" | "critical";
}

export interface Doctor {
	id: string;
	name: string;
	specialty: string;
	email: string;
}

export interface Message {
	id: string;
	patientId: string;
	patientName: string;
	doctorId?: string;
	doctorName?: string;
	subject: string;
	content: string;
	date: string;
	read: boolean;
	fromPatient: boolean;
}

export interface Note {
	id: string;
	appointmentId: string;
	patientId: string;
	doctorName: string;
	title: string;
	content: string;
	date: string;
	diagnosis: string;
	appointmentDetails: string;
}

export interface HealthTip {
	id: string;
	category: "nutrition" | "exercise" | "medication" | "wellness" | "sleep";
	title: string;
	content: string;
	icon: string;
}

// Mock Users
export const mockUsers: User[] = [
	{
		id: "patient-1",
		email: "john.patient@email.com",
		name: "John Smith",
		role: "patient"
	},
	{
		id: "admin-1",
		email: "admin@pulsecare.com",
		name: "Dr. Sarah Johnson",
		role: "admin"
	}
];

// Mock Patients
export const mockPatients: Patient[] = [
	{
		id: "patient-1",
		name: "John Smith",
		email: "john.smith@email.com",
		phone: "+1 (555) 123-4567",
		dateOfBirth: "1985-03-15",
		bloodType: "A+",
		allergies: ["Penicillin", "Peanuts"],
		conditions: ["Type 2 Diabetes", "Hypertension"],
		emergencyContact: {
			name: "Jane Smith",
			phone: "+1 (555) 987-6543",
			relationship: "Spouse"
		},
		createdAt: "2024-01-15"
	},
	{
		id: "patient-2",
		name: "Emily Davis",
		email: "emily.davis@email.com",
		phone: "+1 (555) 234-5678",
		dateOfBirth: "1992-07-22",
		bloodType: "O-",
		allergies: ["Sulfa drugs"],
		conditions: ["Asthma"],
		emergencyContact: {
			name: "Michael Davis",
			phone: "+1 (555) 876-5432",
			relationship: "Brother"
		},
		createdAt: "2024-02-20"
	},
	{
		id: "patient-3",
		name: "Robert Wilson",
		email: "robert.wilson@email.com",
		phone: "+1 (555) 345-6789",
		dateOfBirth: "1978-11-08",
		bloodType: "B+",
		allergies: [],
		conditions: ["High Cholesterol", "Arthritis"],
		emergencyContact: {
			name: "Linda Wilson",
			phone: "+1 (555) 765-4321",
			relationship: "Wife"
		},
		createdAt: "2024-03-05"
	},
	{
		id: "patient-4",
		name: "Maria Garcia",
		email: "maria.garcia@email.com",
		phone: "+1 (555) 456-7890",
		dateOfBirth: "1990-05-30",
		bloodType: "AB+",
		allergies: ["Latex", "Ibuprofen"],
		conditions: ["Migraine"],
		emergencyContact: {
			name: "Carlos Garcia",
			phone: "+1 (555) 654-3210",
			relationship: "Husband"
		},
		createdAt: "2024-03-18"
	}
];

// Mock Medications
export const mockMedications: Medication[] = [
	{
		id: "med-1",
		name: "Metformin",
		dosage: "500mg",
		frequency: "daily",
		timesPerDay: 2,
		startDate: "2024-01-15",
		instructions: "Take with meals"
	},
	{
		id: "med-2",
		name: "Lisinopril",
		dosage: "10mg",
		frequency: "daily",
		timesPerDay: 1,
		startDate: "2024-01-15",
		instructions: "Take in the morning"
	},
	{
		id: "med-3",
		name: "Atorvastatin",
		dosage: "20mg",
		frequency: "daily",
		timesPerDay: 1,
		startDate: "2024-02-01",
		instructions: "Take at bedtime"
	},
	{
		id: "med-4",
		name: "Vitamin D3",
		dosage: "2000 IU",
		frequency: "daily",
		timesPerDay: 1,
		startDate: "2024-01-01",
		instructions: "Take with food"
	}
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
	{
		id: "apt-1",
		patientId: "patient-1",
		patientName: "John Smith",
		doctorName: "Dr. Sarah Johnson",
		date: "2025-12-20",
		time: "09:00",
		type: "checkup",
		status: "scheduled",
		notes: "Regular quarterly checkup"
	},
	{
		id: "apt-2",
		patientId: "patient-2",
		patientName: "Emily Davis",
		doctorName: "Dr. Michael Chen",
		date: "2025-12-21",
		time: "14:30",
		type: "follow-up",
		status: "scheduled",
		notes: "Follow-up on asthma medication"
	},
	{
		id: "apt-3",
		patientId: "patient-3",
		patientName: "Robert Wilson",
		doctorName: "Dr. Sarah Johnson",
		date: "2025-12-22",
		time: "10:00",
		type: "lab",
		status: "scheduled",
		notes: "Cholesterol panel"
	},
	{
		id: "apt-4",
		patientId: "patient-4",
		patientName: "Maria Garcia",
		doctorName: "Dr. Emily Roberts",
		date: "2025-12-23",
		time: "11:30",
		type: "consultation",
		status: "scheduled",
		notes: "Migraine treatment options"
	},
	{
		id: "apt-5",
		patientId: "patient-1",
		patientName: "John Smith",
		doctorName: "Dr. Michael Chen",
		date: "2025-12-28",
		time: "15:00",
		type: "follow-up",
		status: "scheduled",
		notes: "Diabetes management review"
	}
];

// Mock Health Stats
export const mockHealthStats: HealthStat[] = [
	{
		id: "stat-1",
		type: "blood_pressure",
		value: "128/82",
		unit: "mmHg",
		date: "2024-12-15",
		status: "warning"
	},
	{
		id: "stat-2",
		type: "glucose",
		value: "98",
		unit: "mg/dL",
		date: "2024-12-15",
		status: "normal"
	},
	{
		id: "stat-3",
		type: "cholesterol",
		value: "195",
		unit: "mg/dL",
		date: "2024-12-10",
		status: "normal"
	},
	{
		id: "stat-4",
		type: "heart_rate",
		value: "72",
		unit: "bpm",
		date: "2024-12-15",
		status: "normal"
	},
	{
		id: "stat-5",
		type: "weight",
		value: "175",
		unit: "lbs",
		date: "2024-12-14",
		status: "normal"
	}
];

// Mock Doctors
export const mockDoctors: Doctor[] = [
	{
		id: "doctor-1",
		name: "Dr. Sarah Johnson",
		specialty: "Internal Medicine",
		email: "sarah.johnson@pulsecare.com"
	},
	{
		id: "doctor-2",
		name: "Dr. Michael Chen",
		specialty: "Cardiology",
		email: "michael.chen@pulsecare.com"
	},
	{
		id: "doctor-3",
		name: "Dr. Emily Roberts",
		specialty: "Endocrinology",
		email: "emily.roberts@pulsecare.com"
	}
];

// Mock Messages
export const mockMessages: Message[] = [
	{
		id: "msg-1",
		patientId: "patient-1",
		patientName: "John Smith",
		doctorId: "doctor-1",
		doctorName: "Dr. Sarah Johnson",
		subject: "Question about medication timing",
		content: "Hi Dr. Johnson, I wanted to ask about the best time to take my Metformin. Should I take it before or after meals?",
		date: "2024-12-16T10:30:00",
		read: false,
		fromPatient: true
	},
	{
		id: "msg-2",
		patientId: "patient-2",
		patientName: "Emily Davis",
		doctorId: "doctor-2",
		doctorName: "Dr. Michael Chen",
		subject: "Inhaler refill request",
		content: "Hello, I need a refill on my albuterol inhaler. My current one is almost empty.",
		date: "2024-12-15T14:22:00",
		read: true,
		fromPatient: true
	},
	{
		id: "msg-3",
		patientId: "patient-3",
		patientName: "Robert Wilson",
		doctorId: "doctor-1",
		doctorName: "Dr. Sarah Johnson",
		subject: "Lab results inquiry",
		content: "Dr. Johnson, I was wondering if my recent cholesterol test results are available yet?",
		date: "2024-12-15T09:15:00",
		read: false,
		fromPatient: true
	},
	{
		id: "msg-4",
		patientId: "patient-4",
		patientName: "Maria Garcia",
		doctorId: "doctor-3",
		doctorName: "Dr. Emily Roberts",
		subject: "Appointment rescheduling",
		content: "I need to reschedule my appointment on December 23rd. Is there availability on the 26th instead?",
		date: "2024-12-14T16:45:00",
		read: true,
		fromPatient: true
	}
];

// Mock Notes (from appointments/doctors)
export const mockNotes: Note[] = [
	{
		id: "note-1",
		appointmentId: "apt-1",
		patientId: "patient-1",
		doctorName: "Dr. Sarah Johnson",
		title: "Quarterly Checkup Summary",
		content:
			"Patient is managing diabetes well. Blood sugar levels have stabilized. Continue current medication. Recommend increasing daily walks to 45 minutes.",
		diagnosis: "Diabetes",
		date: "2024-12-15",
		appointmentDetails: "From Checkup appointment on 2024-12-14"
	},
	{
		id: "note-2",
		appointmentId: "apt-5",
		patientId: "patient-1",
		doctorName: "Dr. Michael Chen",
		title: "Diabetes Management Review",
		content:
			"HbA1c levels improved from last visit. Blood pressure slightly elevated - monitor closely. Consider dietary sodium reduction.",
		date: "2024-12-10",
		diagnosis: "Unknown",
		appointmentDetails: "From Checkup appointment on 2024-12-14"
	},
	{
		id: "note-3",
		appointmentId: "apt-1",
		patientId: "patient-1",
		doctorName: "Dr. Sarah Johnson",
		title: "Previous Follow-up Notes",
		content:
			"Discussed lifestyle modifications. Patient committed to reducing processed food intake. Scheduled lab work for cholesterol panel.",
		date: "2024-11-20",
		diagnosis: "Healthy",
		appointmentDetails: "From Checkup appointment on 2024-12-14"
	}
];

// Mock Health Tips
export const mockHealthTips: HealthTip[] = [
	{
		id: "tip-1",
		category: "medication",
		title: "Medication Timing",
		content:
			"Taking your blood pressure medication at the same time each day helps maintain consistent levels and improves effectiveness.",
		icon: "Pill"
	},
	{
		id: "tip-2",
		category: "nutrition",
		title: "Hydration Matters",
		content: "Drinking 8 glasses of water daily can help regulate blood sugar levels and support kidney function.",
		icon: "Droplets"
	},
	{
		id: "tip-3",
		category: "exercise",
		title: "Daily Movement",
		content: "Just 30 minutes of moderate walking can significantly improve cardiovascular health and help manage blood pressure.",
		icon: "Heart"
	},
	{
		id: "tip-4",
		category: "sleep",
		title: "Quality Rest",
		content:
			"Getting 7-8 hours of sleep helps your body regulate hormones and recover, which is essential for managing chronic conditions.",
		icon: "Moon"
	},
	{
		id: "tip-5",
		category: "wellness",
		title: "Stress Management",
		content: "Practice deep breathing for 5 minutes daily. Chronic stress can raise blood pressure and affect blood sugar control.",
		icon: "Sparkles"
	}
];
