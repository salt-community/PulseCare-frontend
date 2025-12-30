import { createRoute } from "@tanstack/react-router";
import { patientRoute } from "./patient.route";
import NotesPage from "../features/patient/notes/NotesPage";

export const notesRoute = createRoute({
	getParentRoute: () => patientRoute,
	path: "/notes",
	component: NotesPage
});
