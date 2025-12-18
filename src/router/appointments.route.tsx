import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import AppointmentsPage from "../features/patient/appointments/AppointmentsPage";

export const appointRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/appointment",
	component: AppointmentsPage
});
