import { HeartPulse, Droplet, Activity, Gauge, Scale, Droplets } from "lucide-react";

export const statIcons: Record<string, React.ElementType> = {
	blood_pressure: Gauge,
	glucose: Droplet,
	cholesterol: Activity,
	heart_rate: HeartPulse,
	weight: Scale,
	droplets: Droplets
};
