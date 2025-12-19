import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import AdminLayout from "./AdminLayout";

export const adminRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/admin",
	component: AdminLayout
});
