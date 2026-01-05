type SelectInputProps = {
	label: string;
	value: string;
	onChange: (value: string) => void;
	options: { label: string; value: string }[];
	required: boolean;
	className?: string;
};

export const SelectInput = ({ label, value, onChange, options, required, className = "" }: SelectInputProps) => {
	const baseClass =
		"focus-visible:ring-2 w-full focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-1 border border-foreground/20 rounded-md p-1 " +
		className;

	const labelStyling = "block p-1 text-md font-semibold";

	return (
		<div className="p-1 m-1">
			<label className={labelStyling}>{label}</label>

			<select className={baseClass} value={value} onChange={e => onChange(e.target.value)} required={required}>
				<option value="">Select...</option>
				{options.map(opt => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
};
