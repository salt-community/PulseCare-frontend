import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const pillVariants = cva(
	"flex justify-center h-5 inline-flex  items-center rounded-full border h-6 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 max-w-max",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary-light text-primary-dark hover:bg-primary/80",
				secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive: "border-transparent bg-destructive-light text-destructive-foreground hover:bg-destructive/80",
				warning: "border-transparent bg-warning-light text-warning hover:bg-warning/80"
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
