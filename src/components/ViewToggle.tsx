import React from "react";
import { LayoutGrid, LayoutList } from "lucide-react";

interface ViewToggleProps {
  view: string;
  onChange: (view: string) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onChange }) => {
  return (
    <div className="inline-flex items-center rounded-full border border-gray-200 bg-white/90 p-1 backdrop-blur-sm shadow-sm transition-all duration-200 hover:shadow-md">
      <button
        className={`
          relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200
          ${
            view === "grid"
              ? "bg-black text-white shadow-sm"
              : "text-gray-500 hover:text-gray-800"
          }`}
        onClick={() => onChange("grid")}
        aria-label="Grid view"
      >
        <span
          className={`
            absolute inset-0 rounded-full transition-opacity
            ${view === "grid" ? "opacity-100" : "opacity-0"}
          `}
        >
          <span className="absolute inset-0 rounded-full bg-black"></span>
        </span>
        <LayoutGrid size={18} className="relative z-10" />
      </button>

      <button
        className={`
          relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200
          ${
            view === "list"
              ? "bg-black text-white shadow-sm"
              : "text-gray-500 hover:text-gray-800"
          }`}
        onClick={() => onChange("list")}
        aria-label="List view"
      >
        <span
          className={` absolute inset-0 rounded-full transition-opacity
            ${view === "list" ? "opacity-100" : "opacity-0"}`}
        >
          <span className="absolute inset-0 rounded-full bg-black"></span>
        </span>
        <LayoutList size={18} className="relative z-10" />
      </button>
    </div>
  );
};

export default ViewToggle;
