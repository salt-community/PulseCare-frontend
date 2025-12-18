import { createRouter } from "@tanstack/react-router";
import { medRoute } from "./medication.route";
import { rootRoute } from "./rootRoute";
import { appointRoute } from "./appointments.route";
import { dashRoute } from "./dashboard.route";
import { statsRoute } from "./healthstats.route";
import { messRoute } from "./messages.route";
import { notesRoute } from "./notes.route";

rootRoute.addChildren([medRoute, appointRoute, dashRoute, statsRoute, messRoute, notesRoute]);
export const router = createRouter({
	routeTree: rootRoute
});
