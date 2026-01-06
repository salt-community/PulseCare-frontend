const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import type { AdminDashboard } from "../types/adminDashboard";

export async function fetchAdminDashboard(token: string): Promise<AdminDashboard> {
	const res = await fetch(`${API_BASE_URL}/AdminDashboard`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	});

	if (!res.ok) throw new Error("Failed to load admin dashboard");

	return res.json();
}
