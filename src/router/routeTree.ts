import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import { indexRoute } from "./index.route";
import { medRoute } from "./medications.route";
import { appointRoute } from "./appointments.route";
import { dashRoute } from "./dashboard.route";
import { statsRoute } from "./healthstats.route";
import { messRoute } from "./messages.route";
import { notesRoute } from "./notes.route";

rootRoute.addChildren([indexRoute, medRoute, appointRoute, dashRoute, statsRoute, messRoute, notesRoute]);
export const router = createRouter({
	routeTree: rootRoute
});
