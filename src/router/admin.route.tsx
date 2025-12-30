import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import AdminLayout from "./AdminLayout";
import { adminRouteGuard } from "./routeGuards";

export const adminRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/admin",
	beforeLoad: adminRouteGuard,
	component: AdminLayout
});
