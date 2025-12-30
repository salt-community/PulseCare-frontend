import { createRoute } from "@tanstack/react-router";
import { patientRoute } from "./patient.route";
import AppointmentsPage from "../features/patient/appointments/AppointmentsPage";

export const appointRoute = createRoute({
	getParentRoute: () => patientRoute,
	path: "/appointments",
	component: AppointmentsPage
});
