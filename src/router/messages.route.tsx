import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import MessagesPage from "../features/patient/messages/MessagesPage";

export const messRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/messages",
	component: MessagesPage
});
