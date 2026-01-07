export type HealthStatType = "BloodPressure" | "Glucose" | "Cholesterol" | "HeartRate" | "Weight";
export type HealthStatusType = "Normal" | "Warning" | "Critical";

export type HealthStat = {
	id: string;
	type: HealthStatType;
	value: string;
	unit: string;
	date: string;
	status: HealthStatusType;
};
