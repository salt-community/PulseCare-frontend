import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";
import PulseLogo from "../components/shared/PulseCareLogo";
import Spinner from "../components/shared/Spinner";

export default function LoginPage() {
	return (
		<div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
			<ClerkLoading>
				<Spinner size="md" />
			</ClerkLoading>

			<ClerkLoaded>
				<div className="my-6">
					<PulseLogo size="lg" showText={false} />
				</div>

				<div className="text-center">
					<h1 className="text-4xl font-bold text-foreground mb-2">PulseCare</h1>
					<h2 className="text-lg text-card-foreground">Your health, our priority</h2>
				</div>

				<div className="my-10">
					<SignIn />
				</div>
			</ClerkLoaded>
		</div>
	);
}
