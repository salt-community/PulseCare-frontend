import { createRoute } from "@tanstack/react-router";
import AdminDashboardPage from "../features/admin/dashboard/AdminDashboardPage";
import { adminRoute } from "./admin.route";

export const adminDashRoute = createRoute({
	getParentRoute: () => adminRoute,
	path: "/dashboard",
	component: AdminDashboardPage
});
