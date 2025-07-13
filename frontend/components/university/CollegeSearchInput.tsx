import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useUniSearch } from "@/hooks/useUniSearch";

export default function CollegeSearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (name: string, id?: string) => void;
}) {
  const [inputValue, setInputValue] = useState(value);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { results, loading, search } = useUniSearch();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onChange(val, undefined); // Clear selected college id when editing
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    if (val.trim().length === 0) {
      setDropdownOpen(false);
      return;
    }
    debounceTimeout.current = setTimeout(() => {
      search(val);
      setDropdownOpen(true);
    }, 300);
  };

  const handleSelectCollege = (collegeName: string, collegeId: string) => {
    setInputValue(collegeName);
    onChange(collegeName, collegeId);
    setDropdownOpen(false);
  };

  // Hide dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div ref={wrapperRef} className="relative">
      <Input
        ref={inputRef}
        placeholder="Enter name of university"
        className="h-12 pl-4 pr-10"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          if (inputValue.trim().length > 0 && results.colleges.length > 0)
            setDropdownOpen(true);
        }}
        autoComplete="off"
      />
      <Search className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
      {dropdownOpen && (
        <div className="absolute left-0 top-14 z-20 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-lg">
          {loading && (
            <div className="px-4 py-2 text-gray-500">Searching...</div>
          )}
          {!loading &&
            results.colleges.length === 0 &&
            inputValue.trim().length > 0 && (
              <div className="px-4 py-2 text-gray-500">No results found</div>
            )}
          {results.colleges.map((college) => (
            <div
              key={college.id}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onMouseDown={() =>
                handleSelectCollege(college.college_name, String(college.id))
              }
            >
              {college.college_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
