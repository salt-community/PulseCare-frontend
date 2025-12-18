import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import type { ReactElement } from "react";
import PulseCareLogo from "./PulseCareLogo";
import { Link } from "@tanstack/react-router";

export function Header(): ReactElement {
	const { user } = useUser();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-md bg-background/80 shrink-0">
			<div className="flex justify-between items-center py-3 px-6">
				<Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
					<PulseCareLogo size="sm" showText={false} />
					<span className="font-bold text-xl text-foreground">PulseCare</span>
				</Link>
				<SignedOut>
					<div className="rounded-lg px-3 py-2 cursor-pointer transition-colors hover:bg-primary-light">
						<SignInButton />
					</div>
				</SignedOut>
				<SignedIn>
					<div className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer transition-colors hover:bg-primary-light">
						<UserButton />
						<div className="flex flex-col">
							<span className="text-sm font-medium text-foreground">{user?.fullName}</span>
							<p className="text-xs text-card-foreground">Patient</p>
						</div>
					</div>
				</SignedIn>
			</div>
		</header>
	);
}
