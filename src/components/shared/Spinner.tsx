interface SpinnerProps {
	size?: "sm" | "md" | "lg";
	color?: string;
}

export default function Spinner({ size = "md", color = "border-primary" }: SpinnerProps) {
	const sizes = {
		sm: "h-8 w-8 border-b-2",
		md: "h-12 w-12 border-b-2",
		lg: "h-16 w-16 border-b-2"
	};

	return <div className={`animate-spin rounded-full ${sizes[size]} ${color}`} />;
}
