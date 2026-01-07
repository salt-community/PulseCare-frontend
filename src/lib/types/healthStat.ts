export type HealthStatType = "BloodPressure" | "HeartRate" | "BloodSugar" | "Weight" | "Temperature";
export type HealthStatusType = "Normal" | "Warning" | "Critical";

export type HealthStat = {
	id: string;
	type: HealthStatType;
	value: string;
	unit: string;
	date: string;
	status: HealthStatusType;
};
