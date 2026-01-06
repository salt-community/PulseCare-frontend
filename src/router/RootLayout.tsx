import { useAuth, useUser } from "@clerk/clerk-react";
import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { ChatProvider } from "../context/ChatContext";

export const RootLayout = () => {
	const navigate = useNavigate();
	const { isSignedIn, isLoaded, getToken } = useAuth();
	const { location } = useRouterState();
	const { user } = useUser();

	const isAdmin = user?.publicMetadata.role === "admin";
	const role = isAdmin ? "doctor" : "patient";

	const hardcodedId = isAdmin ? "067fa0de-2b36-4368-a491-604a73454c23" : "183977c2-a4a1-408b-89fb-7d4a136738df";

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

	if (!isLoaded) return null;
	return (
		<ChatProvider token={async () => (await getToken()) ?? ""} role={role} userId={hardcodedId}>
			<Outlet />
		</ChatProvider>
	);
};
