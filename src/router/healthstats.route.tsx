import { createRoute } from "@tanstack/react-router";
import { patientRoute } from "./patient.route";
import HealthStatsPage from "../features/patient/health-stats/HealthStatsPage";

export const statsRoute = createRoute({
	getParentRoute: () => patientRoute,
	path: "/stats",
	component: HealthStatsPage
});
