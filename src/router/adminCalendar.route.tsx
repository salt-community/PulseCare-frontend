import { createRoute } from "@tanstack/react-router";
import { AdminCalendarPage } from "../features/admin/calendar/AdminCalendarPage";
import { adminRoute } from "./admin.route";

export const adminCalendarRoute = createRoute({
	getParentRoute: () => adminRoute,
	path: "/calendar",
	component: AdminCalendarPage
});
