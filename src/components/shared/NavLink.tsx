import { Link } from "@tanstack/react-router";

type NavLinkProps = {
	to: string;
	label: string;
	children: React.ReactNode;
};

export const NavLink = ({ to, label, children }: NavLinkProps) => {
	return (
		<Link
			to={to}
			activeProps={{ className: "bg-primary-light" }}
			className={`flex items-center gap-2 px-4 py-2 hover:bg-primary-light rounded `}
		>
			{children}
			{label}
		</Link>
	);
};
