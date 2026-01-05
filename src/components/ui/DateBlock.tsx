import { format } from "date-fns";

interface DateBlockProps {
	date: string;
	size?: "sm" | "md";
}

export function DateBlock({ date, size = "md" }: DateBlockProps) {
	const sizes = {
		sm: { text: "text-sm", subtext: "text-xs", padding: "p-2", minWidth: "min-w-12" },
		md: { text: "text-lg", subtext: "text-xs", padding: "p-3", minWidth: "min-w-16" }
	};

	return (
		<div className={`${sizes[size].padding} rounded-lg bg-primary/10 text-center ${sizes[size].minWidth}`}>
			<p className={`font-bold text-primary ${sizes[size].text}`}>{format(new Date(date), "d")}</p>
			<p className={`text-xs text-card-foreground uppercase ${sizes[size].subtext}`}>{format(new Date(date), "MMM")}</p>
		</div>
	);
}
