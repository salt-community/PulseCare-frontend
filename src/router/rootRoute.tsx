import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth, useUser } from "@clerk/clerk-react";

export const rootRoute = createRootRoute({
	component: RootComponent
});

function RootComponent() {
	const navigate = useNavigate();
	const { isSignedIn, sessionClaims, isLoaded } = useAuth();
	const { location } = useRouterState();
	const { user } = useUser();

	useEffect(() => {
		if (!isLoaded && !isSignedIn && location.pathname !== "/") {
			navigate({ to: "/" });
		}
	}, [isLoaded, isSignedIn, location.pathname, navigate]);

	useEffect(() => {
		if (!isLoaded) return;
		if (!isSignedIn) return;

		const isAdmin = user?.publicMetadata.role === "admin";

		if (isAdmin) {
			navigate({ to: "/admin/dashboard" });
		} else {
			navigate({ to: "/patient/dashboard" });
		}
	}, [isSignedIn, sessionClaims, isLoaded, navigate]);

	return <Outlet />;
}
