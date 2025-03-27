/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, ChangeEvent, useCallback } from "react";
import { debounce } from "lodash";
import { Search } from "lucide-react";
import Input from "./Input";

interface CustomSearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceDelay?: number;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
  debounceDelay = 300,
}) => {
  const [query, setQuery] = useState<string>("");

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => onSearch(searchQuery), debounceDelay),
    [onSearch, debounceDelay]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative flex-1 md:max-w-xs">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>

      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="pl-10 w-full"
      />
    </div>
  );
};

export default CustomSearchBar;
