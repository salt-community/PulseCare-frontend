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
	reason?: string;
	notes: Note[];
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
	doctorId: string;
	doctorName: string;
	subject: string;
	content: string;
	date: string;
	readByPatient: boolean;
	readByDoctor: boolean;
	sender: "patient" | "doctor";
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
		reason: "Regular quarterly checkup",
		notes: [
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
		]
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
		reason: "Follow-up on asthma medication",
		notes: []
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
		reason: "Cholesterol panel",
		notes: []
	},
	{
		id: "apt-4",
		patientId: "patient-4",
		patientName: "Maria Garcia",
		doctorName: "Dr. Emily Roberts",
		date: "2026-01-23",
		time: "11:30",
		type: "consultation",
		status: "scheduled",
		reason: "Migraine treatment options",
		notes: []
	},
	{
		id: "apt-7",
		patientId: "patient-4",
		patientName: "Maria Garcia",
		doctorName: "Dr. Emily Roberts",
		date: "2026-01-23",
		time: "11:30",
		type: "consultation",
		status: "scheduled",
		reason: "Migraine treatment options",
		notes: []
	},
	{
		id: "apt-6",
		patientId: "patient-4",
		patientName: "Maria Garcia",
		doctorName: "Dr. Emily Roberts",
		date: "2026-01-23",
		time: "11:30",
		type: "consultation",
		status: "scheduled",
		reason: "Migraine treatment options",
		notes: []
	},
	{
		id: "apt-9",
		patientId: "patient-4",
		patientName: "Maria Garcia",
		doctorName: "Dr. Emily Roberts",
		date: "2026-01-23",
		time: "11:30",
		type: "consultation",
		status: "scheduled",
		reason: "Migraine treatment options",
		notes: []
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
		reason: "Diabetes management review",
		notes: [
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
			}
		]
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
export const mockConversations = [
	{
		id: "00000000-0000-0000-0000-000000000001",
		patientId: "patient-1",
		doctorId: "doctor-1",
		patient: null,
		doctor: null,
		messages: [
			{
				id: "10000000-0000-0000-0000-000000000001",
				subject: "Question about medication timing",
				content: "Hi doctor, when should I take my Metformin?",
				date: "2024-12-16T10:30:00",
				read: true,
				fromPatient: true,
				conversationId: "00000000-0000-0000-0000-000000000001"
			},
			{
				id: "10000000-0000-0000-0000-000000000002",
				subject: "Re: Question about medication timing",
				content: "You should take Metformin with food.",
				date: "2024-12-16T12:00:00",
				read: true,
				fromPatient: false,
				conversationId: "00000000-0000-0000-0000-000000000001"
			},
			{
				id: "10000000-0000-0000-0000-000000000003",
				subject: "Re: Question about medication timing",
				content: "Does it matter if it's breakfast or dinner? I usually eat a very light breakfast.",
				date: "2024-12-16T12:45:00",
				read: true,
				fromPatient: true,
				conversationId: "00000000-0000-0000-0000-000000000001"
			},
			{
				id: "10000000-0000-0000-0000-000000000004",
				subject: "Re: Question about medication timing",
				content:
					"Since you are on a once-daily dose, I recommend taking it with your largest meal, which sounds like dinner. This helps minimize stomach upset.",
				date: "2024-12-16T14:20:00",
				read: true,
				fromPatient: false,
				conversationId: "00000000-0000-0000-0000-000000000001"
			},
			{
				id: "10000000-0000-0000-0000-000000000005",
				subject: "Re: Question about medication timing",
				content: "I've been feeling a bit nauseous after the evening dose. Is that normal in the beginning?",
				date: "2024-12-18T09:15:00",
				read: true,
				fromPatient: true,
				conversationId: "00000000-0000-0000-0000-000000000001"
			},
			{
				id: "10000000-0000-0000-0000-000000000006",
				subject: "Re: Question about medication timing",
				content: "Yes, mild nausea is a common side effect during the first week. Are you managing to keep your fluids up?",
				date: "2024-12-18T11:00:00",
				read: true,
				fromPatient: false,
				conversationId: "00000000-0000-0000-0000-000000000001"
			},
			{
				id: "10000000-0000-0000-0000-000000000007",
				subject: "Re: Question about medication timing",
				content: "Yes, I'm drinking plenty of water. Should I stop the medication if it gets worse?",
				date: "2024-12-18T13:30:00",
				read: true,
				fromPatient: true,
				conversationId: "00000000-0000-0000-0000-000000000001"
			},
			{
				id: "10000000-0000-0000-0000-000000000008",
				subject: "Re: Question about medication timing",
				content:
					"Please continue for now. If you experience severe vomiting or diarrhea, stop and call the clinic immediately. Let's touch base in 3 days.",
				date: "2024-12-18T15:45:00",
				read: true,
				fromPatient: false,
				conversationId: "00000000-0000-0000-0000-000000000001"
			},
			{
				id: "10000000-0000-0000-0000-000000000009",
				subject: "Re: Question about medication timing",
				content: "The nausea has completely passed now! I feel much better today.",
				date: "2024-12-21T08:00:00",
				read: false,
				fromPatient: true,
				conversationId: "00000000-0000-0000-0000-000000000001"
			},
			{
				id: "10000000-0000-0000-0000-000000000010",
				subject: "Re: Question about medication timing",
				content: "That is great news. It means your body has adjusted. Keep taking it with your dinner as planned.",
				date: "2024-12-21T09:30:00",
				read: false,
				fromPatient: false,
				conversationId: "00000000-0000-0000-0000-000000000001"
			}
		]
	},
	{
		id: "00000000-0000-0000-0000-000000000002",
		patientId: "patient-2",
		doctorId: "doctor-2",
		patient: null,
		doctor: null,
		messages: [
			{
				id: "20000000-0000-0000-0000-000000000001",
				subject: "Inhaler refill request",
				content: "Hello, I need a refill on my albuterol inhaler.",
				date: "2024-12-15T14:22:00",
				read: true,
				fromPatient: true,
				conversationId: "00000000-0000-0000-0000-000000000002",
				conversation: null
			},
			{
				id: "20000000-0000-0000-0000-000000000002",
				subject: "Re: Inhaler refill request",
				content: "I’ve sent a refill to your pharmacy.",
				date: "2024-12-15T15:10:00",
				read: false,
				fromPatient: false,
				conversationId: "00000000-0000-0000-0000-000000000002",
				conversation: null
			}
		]
	},
	{
		id: "00000000-0000-0000-0000-000000000003",
		patientId: "patient-3",
		doctorId: "doctor-1",
		patient: null,
		doctor: null,
		messages: [
			{
				id: "30000000-0000-0000-0000-000000000001",
				subject: "Lab results inquiry",
				content: "Are my cholesterol test results available yet?",
				date: "2024-12-15T09:15:00",
				read: false,
				fromPatient: true,
				conversationId: "00000000-0000-0000-0000-000000000003",
				conversation: null
			},
			{
				id: "30000000-0000-0000-0000-000000000002",
				subject: "Re: Lab results inquiry",
				content: "They should be ready tomorrow morning.",
				date: "2024-12-15T11:40:00",
				read: true,
				fromPatient: false,
				conversationId: "00000000-0000-0000-0000-000000000003",
				conversation: null
			}
		]
	},
	{
		id: "00000000-0000-0000-0000-000000000004",
		patientId: "patient-4",
		doctorId: "doctor-3",
		patient: null,
		doctor: null,
		messages: [
			{
				id: "40000000-0000-0000-0000-000000000001",
				subject: "Appointment rescheduling",
				content: "Can I move my appointment from the 23rd to the 26th?",
				date: "2024-12-14T16:45:00",
				read: true,
				fromPatient: true,
				conversationId: "00000000-0000-0000-0000-000000000004",
				conversation: null
			},
			{
				id: "40000000-0000-0000-0000-000000000002",
				subject: "Re: Appointment rescheduling",
				content: "Yes, the 26th is available. I’ve updated your booking.",
				date: "2024-12-14T17:10:00",
				read: true,
				fromPatient: false,
				conversationId: "00000000-0000-0000-0000-000000000004",
				conversation: null
			}
		]
	},
	{
		id: "00000000-0000-0000-0000-000000000005",
		patientId: "patient-1",
		doctorId: "doctor-2",
		patient: null,
		doctor: null,
		messages: [
			{
				id: "50000000-0000-0000-0000-000000000001",
				subject: "Side effects from new medication",
				content: "I’ve been feeling dizzy since starting the new pills.",
				date: "2024-12-13T08:20:00",
				read: false,
				fromPatient: true,
				conversationId: "00000000-0000-0000-0000-000000000005",
				conversation: null
			}
		]
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
