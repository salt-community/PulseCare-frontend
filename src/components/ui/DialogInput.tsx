type InputProps = {
	type: React.HTMLInputTypeAttribute;
	placeholder?: React.HTMLInputTypeAttribute;
	label: string;
	rows?: number;
	className?: string;
};

export const DialogInput = ({ type, label, placeholder, rows = 4, className = "" }: InputProps) => {
	const baseClass =
		"focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-1 border border-foreground/20 rounded-md p-1" +
		className;
	const labelStyling = "block p-1 text-md font-semibold";

	if (type === "textarea") {
		return (
			<div className="p-1 m-1">
				<label className={labelStyling}>{label}</label>
				<textarea className={baseClass} placeholder={placeholder} rows={rows} />
			</div>
		);
	}

	return (
		<div className="p-1 m-1">
			<label className={labelStyling}>{label}</label>
			<input className={baseClass} type={type} placeholder={placeholder} />
		</div>
	);
};
