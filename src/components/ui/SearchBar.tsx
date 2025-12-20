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
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-blue-100 px-10 py-2 focus:border-blue-300 focus:ring-1 focus:ring-blue-200 outline-none"
      />
    </div>
  );
};
