import { HeartPulse, Droplet, Activity, Gauge, Scale, Droplets } from "lucide-react";

export const statIcons: Record<string, React.ElementType> = {
	BloodPressure: Gauge,
	Glucose: Droplet,
	Cholesterol: Activity,
	HeartRate: HeartPulse,
	Weight: Scale,
	droplets: Droplets
};
