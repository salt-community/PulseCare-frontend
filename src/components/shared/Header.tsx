import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

export function Header() {
	const { user } = useUser();

	return (
		<NavigationMenu.Root>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<SignedOut>
						<SignInButton />
					</SignedOut>
					<SignedIn>
						<div className="flex items-center gap-2 justify-end py-2 px-4 bg-background">
							<UserButton />
							<div className="flex flex-col">
								<span className="text-sm font-medium">{user?.fullName}</span>
								<p className="text-xs text-gray-500">Patient</p>
							</div>
						</div>
					</SignedIn>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	);
}
