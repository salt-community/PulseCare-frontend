import { createRoute } from "@tanstack/react-router";
import { adminRoute } from "./admin.route";
import { PatientDetailsPage } from "../features/admin/patients/PatientDetailsPage";

export const adminPatientDetailsRoute = createRoute({
	getParentRoute: () => adminRoute,
	path: "/patients/$patientId",
	component: PatientDetailsPage
});
