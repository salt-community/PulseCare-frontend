import { NavLink } from "../shared/NavLink";
import { HouseHeart, Activity, Pill, Calendar, MessageCircleMore, NotepadText } from "lucide-react";

export const PatientSidebar = () => {
	return (
		<div className="flex flex-col gap-1 h-full w-60 border-r border-border bg-background-secondary p-4">
			<NavLink label="Dashboard" to="/patient/dashboard">
				<HouseHeart strokeWidth={1.5} />
			</NavLink>
			<NavLink label="Health Stats" to="/patient/stats">
				<Activity strokeWidth={1.5} />
			</NavLink>
			<NavLink label="Medications" to="/patient/medications">
				<Pill strokeWidth={1.5} />
			</NavLink>
			<NavLink label="Appointments" to="/patient/appointments">
				<Calendar strokeWidth={1.5} />
			</NavLink>
			<NavLink label="Messages" to="/patient/messages">
				<MessageCircleMore strokeWidth={1.5} />
			</NavLink>
			<NavLink label="Notes" to="/patient/notes">
				<NotepadText strokeWidth={1.5} />
			</NavLink>
		</div>
	);
};
