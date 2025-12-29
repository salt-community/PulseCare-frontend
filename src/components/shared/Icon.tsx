import React from "react";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const iconVariants = cva("flex justify-center items-center rounded-xl p-2.5 w-10 h-10", {
	variants: {
		variant: {
			blue: "bg-primary/10 text-primary ",
			red: "bg-destructive-light text-destructive-foreground",
			green: "bg-success/10 text-success",
			gray: "bg-gray-200 text-gray-500"
		}
	},
	defaultVariants: {
		variant: "blue"
	}
});
type IconProps = {
	className?: string;
	children?: React.ReactNode;
} & VariantProps<typeof iconVariants>;

export function Icon({ className, variant, ...props }: IconProps) {
	return <div className={cn(iconVariants({ variant }), className)} {...props}></div>;
}
