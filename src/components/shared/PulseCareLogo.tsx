import { cn } from "../../lib/utils";

interface PulseLogoProps {
	size?: "sm" | "md" | "lg";
	showText?: boolean;
	className?: string;
}

export default function PulseLogo({ size = "md", showText = true, className }: PulseLogoProps) {
	const sizes = {
		sm: { container: "h-10 w-10", icon: "h-5 w-5", text: "text-xl" },
		md: { container: "h-12 w-12", icon: "h-6 w-6", text: "text-xl" },
		lg: { container: "h-16 w-16", icon: "h-8 w-8", text: "text-3xl" }
	};

	const s = sizes[size];

	return (
		<div className={cn("flex items-center gap-3", className)}>
			<div
				className={cn(
					"relative rounded-2xl bg-linear-to-br from-primary-light to-primary shadow-sm flex items-center justify-center",
					s.container
				)}
			>
				{/* Heart with EKG */}
				<svg viewBox="0 0 40 40" className={s.icon} fill="none" xmlns="http://www.w3.org/2000/svg">
					{/* Heart shape */}
					<path
						d="M20 35C20 35 6 25 6 14C6 10 9 6 14 6C17 6 19 8 20 10C21 8 23 6 26 6C31 6 34 10 34 14C34 25 20 35 20 35Z"
						fill="white"
						opacity="0.3"
					/>

					{/* EKG Line */}
					<path
						d="M4 20H10L12 16L14 24L16 12L18 28L20 8L22 32L24 14L26 22L28 18H36"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						style={{ strokeDasharray: 200, strokeDashoffset: 0 }}
					>
						<animate attributeName="stroke-dashoffset" from="200" to="0" dur="1.5s" repeatCount="indefinite" />
					</path>

					{/* Heart outline */}
					<path
						d="M20 35C20 35 6 25 6 14C6 10 9 6 14 6C17 6 19 8 20 10C21 8 23 6 26 6C31 6 34 10 34 14C34 25 20 35 20 35Z"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						fill="none"
					/>
				</svg>

				{/* Pulse glow effect */}
				<div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary-light to-primary opacity-50 animate-pulse-glow" />
			</div>

			{showText && <span className={cn("font-bold text-foreground", s.text)}>PulseCare</span>}
		</div>
	);
}
