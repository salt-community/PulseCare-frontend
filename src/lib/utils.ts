import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const getColor = (varName: string) => getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

export const clerkAppearance = {
	variables: {
		colorPrimary: getColor("--color-primary"),
		colorDanger: getColor("--color-destructive-light"),
		colorSuccess: getColor("--color-success"),
		colorWarning: getColor("--color-warning"),
		colorNeutral: getColor("--color-foreground")
	}
};
