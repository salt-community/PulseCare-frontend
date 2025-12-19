import { createRoute } from "@tanstack/react-router";
import { patientRoute } from "./patient.route";
import MessagesPage from "../features/patient/messages/MessagesPage";

export const messRoute = createRoute({
	getParentRoute: () => patientRoute,
	path: "/messages",
	component: MessagesPage
});
