import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import PatientLayout from "./PatientLayout";

export const patientRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/patient",
	component: PatientLayout
});
