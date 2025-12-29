import { Outlet } from "@tanstack/react-router";
import { PatientSidebar } from "../components/ui/PatientSidebar";
import { Header } from "../components/shared/Header";
import { useState } from "react";

const PatientLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const closeSidebar = () => setSidebarOpen(false);
	return (
		<div className="h-screen w-screen flex flex-col ">
			<Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
			<div className="flex flex-1 overflow-hidden">
				<aside className="hidden md:flex md:shrink-0">
					<PatientSidebar />
				</aside>
				<main className="flex-1 overflow-y-auto p-6 bg-background">
					<Outlet />
				</main>
			</div>
			{sidebarOpen && (
				<>
					<div className="fixed inset-0 bg-black/50 z-30 mt-[4.8125rem] md:hidden" onClick={closeSidebar} />
					<div className="fixed inset-y-0 left-0 z-40 md:hidden" onClick={e => e.stopPropagation()}>
						<div className="flex flex-col h-full pt-[4.8125rem] relative">
							<PatientSidebar onClose={closeSidebar} />
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default PatientLayout;
