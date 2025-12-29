import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useRef } from "react";
import type { ReactElement } from "react";
import PulseCareLogo from "./PulseCareLogo";
import { Link } from "@tanstack/react-router";
import HamburgerCollapse from "hamburger-react";

interface HeaderProps {
	onMenuToggle?: () => void;
	sidebarOpen?: boolean;
}

export function Header({ onMenuToggle, sidebarOpen = false }: HeaderProps): ReactElement {
	const { user } = useUser();
	const userButtonRef = useRef<HTMLDivElement>(null);

	const isAdmin = user?.publicMetadata.role === "admin";
	const path = isAdmin ? "/admin/dashboard" : "/patient/dashboard";
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
		<header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-md bg-background/80 shrink-0 min-h-19.25">
			<div className="flex justify-between items-center py-3 px-6 h-full">
				<button
					className="md:hidden p-1.5 rounded-lg hover:bg-muted transition-all mr-4"
					onClick={onMenuToggle}
					aria-label={sidebarOpen ? "Close menu" : "Open menu"}
				>
					<HamburgerCollapse
						toggled={sidebarOpen}
						toggle={onMenuToggle}
						color="currentColor"
						size={24}
						rounded
						direction="left"
					/>
				</button>
				<div className="flex-1 md:flex-none mx-auto md:mx-0">
					<Link to={path} className="flex items-center justify-center md:justify-start gap-3 hover:opacity-90 transition-opacity">
						<PulseCareLogo size="sm" showText={false} />
						<span className="font-bold text-xl text-foreground">PulseCare</span>
					</Link>
				</div>
				<div className="hidden md:flex">
					<SignedOut>
						<div className="rounded-lg px-3 py-2 cursor-pointer transition-colors hover:bg-primary-light">
							<SignInButton />
						</div>
					</SignedOut>
					<SignedIn>
						<div
							ref={userButtonRef}
							onClick={handleAuthClick}
							className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer transition-colors hover:bg-primary-light"
						>
							<UserButton />
							<div className="flex flex-col">
								<span className="text-sm font-medium text-foreground">{user?.fullName}</span>
								<p className="text-xs text-card-foreground">{role}</p>
							</div>
						</div>
					</SignedIn>
				</div>
			</div>
		</header>
	);
}
