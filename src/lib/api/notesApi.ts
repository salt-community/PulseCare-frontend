import type { CreateNoteRequest } from "../types";
import type { Note } from "../types/patients";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/notes`;

export const fetchNotes = async (accessToken: string): Promise<Note[]> => {
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

export const addNote = async (accessToken: string, note: CreateNoteRequest) => {
	const response = await fetch(API_BASE_URL, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${accessToken}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(note)
	});

	if (!response.ok) {
		throw new Error("Failed to add note");
	}
};
