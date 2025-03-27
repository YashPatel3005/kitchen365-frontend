import { ITEMSPERPAGEOPTIONS } from "@/lib/constants";
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
        <label htmlFor="itemsPerPage" className="mr-2 text-gray-700">
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="border rounded p-1"
        >
          {ITEMSPERPAGEOPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center">
        {/* <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded mr-2 pagination-button ${
            currentPage === 1 ? "disabled" : ""
          }`}
        >
          Previous
        </button> */}

        <FontAwesomeIcon
          icon={faLessThan}
          onClick={() => onPageChange(currentPage - 1)}
          //   disabled={currentPage === 1}
          //   className="cursor-pointer text-gray-500 opacity-70 hover:opacity-100 hover:text-red-600"
          className={` rounded-3xl ml-2 py-1.5 px-2 bg-primary mr-2  ${
            currentPage === 1 ? "disabled cursor-not-allowed" : ""
          }`}
        />

        <span>
          Page {currentPage} of {totalPages}
        </span>
        {/* <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded ml-2 pagination-button ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          Next
        </button> */}
        <FontAwesomeIcon
          icon={faGreaterThan}
          onClick={() => onPageChange(currentPage + 1)}
          //   disabled={currentPage === totalPages}
          className={` rounded-3xl ml-2 py-1.5 px-2 bg-primary ${
            currentPage === totalPages ? "disabled cursor-not-allowed" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default Pagination;
