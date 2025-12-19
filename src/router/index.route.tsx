import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import PatientDashboard from "../features/patient/dashboard/PatientDashboard";

export const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: PatientDashboard
});
