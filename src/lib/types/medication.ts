export type CreateMedicationDto = {
	name: string;
	dosage: string;
	frequency: string;
	instructions?: string | null;
	timesPerDay: number;
	startDate: string;
	endDate?: string | null;
};

export type UpdateMedicationDto = {
	name: string;
	dosage: string;
	frequency: string;
	instructions?: string | null;
	timesPerDay: number;
	startDate: string;
	endDate?: string | null;
};

export type Medication = {
	id: string;
	name: string;
	dosage: string;
	frequency: string;
	timesPerDay: number;
	startDate: string;
	endDate?: string | null;
	instructions?: string | null;
};
