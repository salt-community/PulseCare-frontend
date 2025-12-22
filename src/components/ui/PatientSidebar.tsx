import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { NavLink } from "../shared/NavLink";
import { HouseHeart, Activity, Pill, Calendar, MessageCircleMore, NotepadText } from "lucide-react";

interface PatientSidebarProps {
	className?: string;
}
export const PatientSidebar = ({ className = "" }: PatientSidebarProps) => {
	const { user } = useUser();
	const isAdmin = user?.publicMetadata.role === "admin";
	const role = isAdmin ? "Admin" : "Patient";
	return (
		<div className={`flex flex-col gap-1 h-full ${className} w-60 border-r border-border bg-background-secondary p-4`}>
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
			<div className="flex md:hidden mt-8 pt-4 border-t border-border">
				<SignedIn>
					<div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted w-full cursor-pointer transition-colors">
						<UserButton />
						<div className="flex flex-col">
							<span className="text-sm font-semibold text-foreground truncate">{user?.fullName}</span>
							<p className="text-xs text-muted-foreground">{role}</p>
						</div>
					</div>
				</SignedIn>
				<SignedOut>
					<div className="p-3 rounded-xl hover:bg-muted w-full text-center cursor-pointer transition-colors">
						<SignInButton />
					</div>
				</SignedOut>
			</div>
		</div>
	);
};
