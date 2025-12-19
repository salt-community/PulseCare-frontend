import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import { indexRoute } from "./index.route";
import { medRoute } from "./medications.route";
import { appointRoute } from "./appointments.route";
import { dashRoute } from "./dashboard.route";
import { statsRoute } from "./healthstats.route";
import { messRoute } from "./messages.route";
import { notesRoute } from "./notes.route";
import { patientRoute } from "./patient.route";
import { adminRoute } from "./admin.route";

// Root children
rootRoute.addChildren([indexRoute, patientRoute, adminRoute]);

// Patient routes (children of patientRoute)
patientRoute.addChildren([dashRoute, medRoute, appointRoute, statsRoute, messRoute, notesRoute]);

// Admin routes (children of adminRoute)
adminRoute.addChildren([
	/* add admin routes here */
]);

export const router = createRouter({
	routeTree: rootRoute
});
