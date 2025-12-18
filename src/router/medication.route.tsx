import { createRoute } from "@tanstack/react-router";
import MedicationsPage from "../features/patient/medications/MedicationsPage";
import { rootRoute } from "./rootRoute";

export const medRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/medication",
	component: MedicationsPage
});
