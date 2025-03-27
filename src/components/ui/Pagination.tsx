import { ITEMS_PER_PAGE_OPTIONS } from "@/lib/constants";
import { faLessThan, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onItemsPerPageChange(Number(event.target.value));
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center">
        <label htmlFor="itemsPerPage" className="mr-2 text-primary">
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="border rounded p-1"
        >
          {ITEMS_PER_PAGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center">
        <FontAwesomeIcon
          icon={faLessThan}
          onClick={() => onPageChange(currentPage - 1)}
          color="black"
          className={`rounded-2xl ml-2 py-1.5 px-2 mr-2 ${
            currentPage === 1
              ? "disabled cursor-not-allowed text-gray-400"
              : "cursor-pointer"
          }`}
        />

        <span className="text-primary">
          Page {currentPage} of {totalPages}
        </span>

        <FontAwesomeIcon
          icon={faGreaterThan}
          color="black"
          onClick={() => onPageChange(currentPage + 1)}
          className={`rounded-2xl ml-2 py-1.5 px-2 ${
            currentPage === totalPages
              ? "disabled cursor-not-allowed text-gray-400"
              : "cursor-pointer"
          }`}
        />
      </div>
    </div>
  );
};

export default Pagination;
