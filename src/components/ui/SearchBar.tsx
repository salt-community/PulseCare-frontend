interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <input
      type="text"
      placeholder="Search patients..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border px-4 py-2"
    />
  );
};
