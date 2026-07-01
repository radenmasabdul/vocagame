interface Option {
  label: string;
  value: string;
}

interface SelectFilterProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export default function SelectFilter({
  value,
  options,
  onChange,
}: SelectFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-[#15151f] border border-[#2a2a3e] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none cursor-pointer"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
