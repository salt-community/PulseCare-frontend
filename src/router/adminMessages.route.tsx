import { createRoute } from "@tanstack/react-router";
import AdminMessagesPage from "../features/admin/messages/AdminMessagesPage";
import { adminRoute } from "./admin.route";

export const adminMessageRoute = createRoute({
	getParentRoute: () => adminRoute,
	path: "/messages",
	component: AdminMessagesPage
});
