import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import HealthStatsPage from "../features/patient/health-stats/HealthStatsPage";

export const statsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/stats",
	component: HealthStatsPage
});
