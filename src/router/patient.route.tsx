import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import PatientLayout from "./PatientLayout";
import { patientRouteGuard } from "./routeGuards";

export const patientRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/patient",
	beforeLoad: patientRouteGuard,
	component: PatientLayout
});
