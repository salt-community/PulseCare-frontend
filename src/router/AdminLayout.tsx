import { Outlet } from "@tanstack/react-router";
import { Header } from "../components/shared/Header";
import { AdminSidebar } from "../components/ui/AdminSidebar";

const AdminLayout = () => {
	return (
		<div className="h-screen w-screen flex flex-col">
			<Header />
			<div className="flex flex-1 overflow-hidden">
				<aside className="shrink-0">
					<AdminSidebar />
				</aside>
				<main className="flex-1 overflow-y-auto p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default AdminLayout;
