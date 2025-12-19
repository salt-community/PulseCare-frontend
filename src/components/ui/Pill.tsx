import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const pillVariants = cva(
	"flex justify-center h-5 inline-flex  items-center rounded-full border h-6 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
				secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
				outline: "text-foreground"
			}
		},
		defaultVariants: {
			variant: "default"
		}
	}
);

type PillProps = {
	className?: string;
	children?: React.ReactNode;
} & VariantProps<typeof pillVariants>;

export function Pill({ className, variant, ...props }: PillProps) {
	return <div className={cn(pillVariants({ variant }), className)} {...props} />;
}
