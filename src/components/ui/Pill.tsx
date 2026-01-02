import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const pillVariants = cva(
	"flex justify-center h-5 inline-flex items-center rounded-full border h-6 px-2.5 py-0.5 max-[440px]:text-[11px] max-[400px]:text-[10px] max-[440px]:px-2 max-[440px]:py-0.5 max-[400px]:px-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 max-w-max whitespace-nowrap",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary-light text-primary-dark hover:bg-primary-light/80",
				secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive: "border-transparent bg-destructive-light text-destructive-foreground hover:bg-destructive-light/80",
				warning: "border-transparent bg-warning-light text-warning hover:bg-warning-light/80"
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
