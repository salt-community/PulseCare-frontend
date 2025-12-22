import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import LoginPage from "../pages/LoginPage";

export const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: LoginPage
});
