import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
	"flex items-center cursor-pointer justify-center gap-1 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
	{
		variants: {
			variant: {
				default: "bg-primary text-card hover:bg-primary-dark/90",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover/80",
				destructive: "bg-destructive-light text-destructive-foreground hover:bg-destructive-dark/50",
				outline: "text-primary hover:bg-primary-light/80 hover:text-primary-dark",
				submit: "bg-primary text-card hover:bg-primary-dark/90 w-full"
			},
			size: {
				default: "h-10 px-4 py-0.5 text-sm",
				sm: "h-9 rounded-md px-3 py-0.5 text-xs",
				lg: "h-11 rounded-md px-8 py-1 text-md",
				icon: "h-10 w-10"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	}
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : "button";
	return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button };
