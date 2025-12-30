import { format } from "date-fns";

interface DateBlockProps {
	date: string;
	size?: "sm" | "md";
}

export function DateBlock({ date, size = "md" }: DateBlockProps) {
	const sizes = {
		sm: { container: "w-14 h-16", text: "text-xl", subtext: "text-xs" },
		md: { container: "w-17.5 h-20", text: "text-2xl", subtext: "text-xs" }
	};

	return (
		<div
			className={`relative p-3 rounded-2xl bg-linear-to-br from-primary-light to-primary text-white text-center ${sizes[size].container} flex items-center justify-center shrink-0`}
		>
			<div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary-light to-primary opacity-50 animate-pulse-glow" />
			<div className="relative z-10 text-center">
				<p className={`font-bold text-white leading-none ${sizes[size].text}`}>{format(new Date(date), "d")}</p>
				<p className={`text-white/80 uppercase ${sizes[size].subtext}`}>{format(new Date(date), "MMM")}</p>
			</div>
		</div>
	);
}
