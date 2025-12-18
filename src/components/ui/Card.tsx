import React from "react";
import { cn } from "../../lib/utils";
export default function Card() {
	return <div>Card</div>;
}
type propsType = {
	className: string;
	props: string[];
};

const cardHeader = ({ className, ...props }: propsType) => (
	<div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}></div>
);
const cardTitle = ({ className, ...props }: propsType) => <div className={cn("text-sm text-muted-foreground", className)} {...props}></div>;
const cardDescription = ({ className, ...props }: propsType) => (
	<div className={cn("text-sm text-muted-foreground ", className)} {...props}></div>
);
const cardContent = ({ className, ...props }: propsType) => <div className={cn("p-6 pt-0", className)} {...props}></div>;
const cardFooter = ({ className, ...props }: propsType) => <div className={cn("flex items-center p-6 pt-0", className)} {...props}></div>;
const card = ({ className, ...props }: propsType) => (
	<div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props}></div>
);

export { cardHeader, cardTitle, cardDescription, cardContent, cardFooter, card };
