import type { Note } from "../types/patients";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/notes`;

export const fetchNotes = async (accessToken: string): Promise<Note[]> => {
	console.log(accessToken);
	const response = await fetch(API_BASE_URL, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${accessToken}`,
			"Content-Type": "application/json"
		}
	});

	if (!response.ok) {
		throw new Error("Failed to fetch notes");
	}

	return response.json();
};
