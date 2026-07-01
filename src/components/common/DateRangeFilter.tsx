import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type DateRange, DayPicker } from "react-day-picker";
import { formatDateRange } from "@/utils/format-date";

interface DateRangeFilterProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
}

export default function DateRangeFilter({
  value,
  onChange,
}: DateRangeFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-[#15151f] border border-[#2a2a3e] rounded-lg px-3 py-2.5 text-sm text-gray-200"
      >
        <Search size={16} />
        {formatDateRange(value)}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 z-50 bg-[#15151f] border border-[#2a2a3e] rounded-xl p-3 shadow-2xl">
          <DayPicker
            mode="range"
            selected={value}
            onSelect={onChange}
            numberOfMonths={1}
            className="text-white"
            classNames={{
              month_caption: "text-white",
              weekdays: "text-gray-300",
              weekday: "text-gray-300",
              day: "text-white hover:bg-[#2a2a3e]",
              today: "text-white font-bold",
            }}
          />

          <div className="flex justify-end gap-2 pt-2 border-t border-[#2a2a3e] mt-2">
            <button
              onClick={() => {
                onChange(undefined);
                setOpen(false);
              }}
              className="px-3 py-1.5 text-xs text-gray-400"
            >
              Clear
            </button>

            <button
              onClick={() => setOpen(false)}
              className="px-3 py-1.5 text-xs bg-[#6d5fde] text-white rounded-md"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
