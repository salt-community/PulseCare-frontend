import { useAuth, useUser } from "@clerk/clerk-react";
import { Outlet, useNavigate, useRouterState, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const RootLayout = () => {
	const navigate = useNavigate();
	const { isSignedIn, isLoaded } = useAuth();
	const { location } = useRouterState();
	const { user } = useUser();
	const auth = useAuth();
	const router = useRouter();

	useEffect(() => {
		router.options.context = { auth };
	}, [auth, router]);

	useEffect(() => {
		if (!isLoaded) return;
		if (isSignedIn) return;
		if (location.pathname !== "/") {
			navigate({ to: "/" });
		}
	}, [isLoaded, isSignedIn, location.pathname, navigate]);

	useEffect(() => {
		if (!isLoaded) return;
		if (!isSignedIn) return;

		const isAuthPage = location.pathname === "/";
		if (!isAuthPage) return;

		const isAdmin = user?.publicMetadata.role === "admin";

		if (isAdmin) {
			navigate({ to: "/admin/dashboard" });
		} else {
			navigate({ to: "/patient/dashboard" });
		}
	}, [isLoaded, isSignedIn, navigate, location.pathname, user?.publicMetadata.role]);

	return <Outlet />;
};
