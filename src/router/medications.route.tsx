import { createRoute } from "@tanstack/react-router";
import { patientRoute } from "./patient.route";
import MedicationsPage from "../features/patient/medications/MedicationsPage";

export const medRoute = createRoute({
	getParentRoute: () => patientRoute,
	path: "/medications",
	component: MedicationsPage
});
