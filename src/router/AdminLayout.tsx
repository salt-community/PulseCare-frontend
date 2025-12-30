import { Outlet } from "@tanstack/react-router";
import { Header } from "../components/shared/Header";
import { AdminSidebar } from "../components/ui/AdminSidebar";
import { useState } from "react";
import { SignedIn, useUser } from "@clerk/clerk-react";
import Spinner from "../components/shared/Spinner";

const AdminLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const closeSidebar = () => setSidebarOpen(false);
	const { user, isLoaded } = useUser();
	const isAdmin = user?.publicMetadata?.role === "admin";

	if (!isLoaded) {
		return (
			<div className="h-screen w-screen flex items-center justify-center">
				<Spinner size="lg" />
			</div>
		);
	}

	if (!isAdmin) {
		return <div>You don't have access to this page.</div>;
	}

	return (
		<SignedIn>
			<div className="h-screen w-screen flex flex-col">
				<Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
				<div className="flex flex-1 overflow-hidden">
					<aside className="hidden md:flex md:shrink-0 h-full">
						<div className="h-full border-r border-border bg-background-secondary overflow-y-auto">
							<AdminSidebar />
						</div>
					</aside>
					<main className="flex-1 overflow-y-auto p-6 bg-background">
						<Outlet />
					</main>
				</div>

				{sidebarOpen && (
					<>
						<div className="fixed inset-0 bg-black/50 top-19.25 z-40 md:hidden" onClick={closeSidebar} />
						<div
							className="fixed inset-x-0 top-19.25 bottom-0 z-50 w-60 md:hidden bg-background-secondary border-r border-border shadow-2xl"
							onClick={e => e.stopPropagation()}
						>
							<div className="h-full mt-4 overflow-y-auto">
								<AdminSidebar onClose={closeSidebar} />
							</div>
						</div>
					</>
				)}
			</div>
		</SignedIn>
	);
};

export default AdminLayout;
