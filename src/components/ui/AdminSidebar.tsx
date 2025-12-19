import { NavLink } from "../shared/NavLink";
import { HouseHeart } from "lucide-react";

export const AdminSidebar = () => {
	return (
		<div className="flex flex-col gap-1 h-full w-60 border-r border-border bg-background-secondary p-4">
			<NavLink label="Dashboard" to="/admin/dashboard">
				<HouseHeart strokeWidth={1.5} />
			</NavLink>
		</div>
	);
};
