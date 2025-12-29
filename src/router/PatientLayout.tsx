import { Outlet } from "@tanstack/react-router";
import { PatientSidebar } from "../components/ui/PatientSidebar";
import { Header } from "../components/shared/Header";
import { useState } from "react";

const PatientLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const closeSidebar = () => setSidebarOpen(false);

	return (
		<div className="h-screen w-screen flex flex-col">
			<Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
			<div className="flex flex-1 overflow-hidden">
				<aside className="hidden md:flex md:shrink-0 h-full">
					<div className="h-full border-r border-border bg-background-secondary overflow-y-auto">
						<PatientSidebar />
					</div>
				</aside>
				<main className="flex-1 overflow-y-auto p-6 bg-background">
					<Outlet />
				</main>
			</div>

			{sidebarOpen && (
				<>
					<div className="fixed inset-0 bg-black/50 top-[4.8125rem] z-40 md:hidden" onClick={closeSidebar} />
					<div
						className="fixed inset-x-0 top-[4.8125rem] bottom-0 z-50 w-64 md:hidden bg-background-secondary border-r border-border shadow-2xl"
						onClick={e => e.stopPropagation()}
					>
						<div className="h-full m-4 overflow-y-auto">
							<PatientSidebar onClose={closeSidebar} />
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default PatientLayout;
