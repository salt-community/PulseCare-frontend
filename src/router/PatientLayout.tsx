import { Outlet } from "@tanstack/react-router";
import { PatientSidebar } from "../components/ui/PatientSidebar";
import { Header } from "../components/shared/Header";

const PatientLayout = () => {
	return (
		<div className="h-screen w-screen flex flex-col ">
			<Header />
			<div className="flex flex-1 overflow-hidden">
				<aside className="shrink-0">
					<PatientSidebar />
				</aside>
				<main className="flex-1 overflow-y-auto p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default PatientLayout;
