import { Search } from "lucide-react";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
	return (
		<div className="relative w-full">
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

			<input
				type="text"
				placeholder="Search patients..."
				value={value}
				onChange={e => onChange(e.target.value)}
				className="w-full px-10 py-2 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-1 border border-foreground/20 rounded-md"
			/>
		</div>
	);
};
