import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative flex-1 min-w-60">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />

      <input
        type="text"
        id="search"
        name="search"
        value={value}
        placeholder="Filter by ID or Customer..."
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#15151f] border border-[#2a2a3e] rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-200 placeholder:text-gray-500 outline-none focus:border-[#3a3a4e]"
      />
    </div>
  );
}
