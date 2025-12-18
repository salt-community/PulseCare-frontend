import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import PatientDashboard from "../features/patient/dashboard/PatientDashboard";

export const dashRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/dashboard",
	component: PatientDashboard
});
