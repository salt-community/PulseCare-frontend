import { createRoute } from "@tanstack/react-router";
import { patientRoute } from "./patient.route";
import PatientDashboard from "../features/patient/dashboard/PatientDashboard";

export const dashRoute = createRoute({
	getParentRoute: () => patientRoute,
	path: "/dashboard",
	component: PatientDashboard
});
