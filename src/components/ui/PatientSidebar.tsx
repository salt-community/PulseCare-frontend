import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useRef } from "react";
import { NavLink } from "../shared/NavLink";
import { HouseHeart, Activity, Pill, Calendar, MessageCircleMore, NotepadText } from "lucide-react";

interface PatientSidebarProps {
	className?: string;
	onClose?: () => void;
}
export const PatientSidebar = ({ className = "", onClose }: PatientSidebarProps) => {
	const userButtonRef = useRef<HTMLDivElement>(null);
	const { user } = useUser();
	const isAdmin = user?.publicMetadata.role === "admin";
	const role = isAdmin ? "Admin" : "Patient";

	const handleAuthClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		const button = userButtonRef.current?.querySelector("button");
		if (button && button.contains(e.target as Node)) {
			return;
		}
		button?.click();
	};
	return (
		<div className={`flex flex-col gap-1 h-full ${className} w-60 border-border bg-background-secondary p-4`}>
			<NavLink label="Dashboard" to="/patient/dashboard" onClick={onClose}>
				<HouseHeart strokeWidth={1.5} />
			</NavLink>
			<NavLink label="Health Stats" to="/patient/stats" onClick={onClose}>
				<Activity strokeWidth={1.5} />
			</NavLink>
			<NavLink label="Medications" to="/patient/medications" onClick={onClose}>
				<Pill strokeWidth={1.5} />
			</NavLink>
			<NavLink label="Appointments" to="/patient/appointments" onClick={onClose}>
				<Calendar strokeWidth={1.5} />
			</NavLink>
			<NavLink label="Messages" to="/patient/messages" onClick={onClose}>
				<MessageCircleMore strokeWidth={1.5} />
			</NavLink>
			<NavLink label="Notes" to="/patient/notes" onClick={onClose}>
				<NotepadText strokeWidth={1.5} />
			</NavLink>
			<div className="flex md:hidden mt-8 pt-4 border-t border-border">
				<SignedIn>
					<div
						ref={userButtonRef}
						onClick={handleAuthClick}
						className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted w-full cursor-pointer transition-colors"
					>
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
