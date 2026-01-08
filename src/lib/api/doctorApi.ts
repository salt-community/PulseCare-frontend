import type { Doctor } from "../types/doctor";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchDoctors = async (getToken: () => Promise<string | null>): Promise<Doctor[]> => {
    const token = await getToken();

    const response = await fetch(`${BASE_URL}/doctor`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Kunde inte hämta läkare");
    }

    return response.json();
};