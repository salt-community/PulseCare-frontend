export type PatientDto = {
	id?: string;
	name: string;
	email: string;
	conditions: string[];
};

export type AppointmentDto = {
	id?: string;
	patientName: string;
	date: string;
	time: string;
	type: string;
};

export type AdminDashboard = {
	totalPatients: number;
	unreadMessages: number;
	todayAppointments: number;
	recentPatients: PatientDto[];
	upcomingAppointments: AppointmentDto[];
};
