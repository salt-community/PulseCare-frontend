import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import NotesPage from "../features/patient/notes/NotesPage";

export const notesRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/notes",
	component: NotesPage
});
