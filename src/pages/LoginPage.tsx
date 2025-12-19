import { SignIn } from "@clerk/clerk-react";
import PulseLogo from "../components/shared/PulseCareLogo";

export default function LoginPage() {
	return (
		<div className="bg-background flex flex-col items-center justify-center px-4">
			{/* Logo */}
			<div className="my-6">
				<PulseLogo size="lg" showText={false} />
			</div>

			{/* Header */}
			<div className="text-center">
				<h1 className="text-4xl font-bold text-foreground mb-2">PulseCare</h1>
				<h2 className="text-lg text-card-foreground">Your health, our priority</h2>
			</div>

			{/* Login Card */}
			<div className="my-10">
				<SignIn />
			</div>
		</div>
	);
}
