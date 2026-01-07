export type Medication = {
	id: string;
	name: string;
	dosage: string;
	frequency: string;
	timesPerDay: number;
	startDate: string;
	endDate?: string;
	instructions?: string;
};
