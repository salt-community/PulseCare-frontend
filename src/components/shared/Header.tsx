import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import type { ReactElement } from "react";

export function Header(): ReactElement {
	const { user } = useUser();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-md bg-background/80">
			<div className="flex justify-end py-2 px-6">
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
