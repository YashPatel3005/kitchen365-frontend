/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, ChangeEvent, useCallback } from "react";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

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

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative flex items-center w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <FontAwesomeIcon icon={faRemove} />
        </button>
      )}
    </div>
  );
};

export default CustomSearchBar;
