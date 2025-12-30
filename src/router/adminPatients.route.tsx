import { createRoute } from "@tanstack/react-router";
import { AdminPatientsPage } from "../features/admin/patients/AdminPatientsPage";
import { adminRoute } from "./admin.route";

export const adminPatientsRoute = createRoute({
	getParentRoute: () => adminRoute,
	path: "/patients",
	component: AdminPatientsPage
});
