import { NavLink } from "../shared/NavLink";
import { HouseHeart } from "lucide-react";

export const Sidebar = () => {
	return (
		<>
			<NavLink label="Patient Dashboard" to="/dashboard">
				<HouseHeart />
			</NavLink>
			<NavLink label="Patient Dashboard" to="/notes">
				<HouseHeart />
			</NavLink>
		</>
	);
};
