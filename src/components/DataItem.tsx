import React from "react";
import { Trash2 } from "lucide-react";

export interface DataItemProps {
  id: string;
  name: string;
  description: string;
  image?: string;
  price: number;
}

interface ItemProps {
  item: DataItemProps;
  view: "grid" | "list";
  index: number;
  onDelete?: (id: string) => void;
}

const DataItem: React.FC<ItemProps> = ({ item, view, index, onDelete }) => {
  const isGrid = view === "grid";

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(item.id);
    }
  };

  return (
    <div
      className={`group overflow-hidden rounded-lg bg-white border border-gray-100 transition-all duration-300
        hover:shadow-lg hover:translate-y-[-2px]
        ${isGrid ? "h-full" : "w-full flex"}
        animate-scale-in
        relative
        animation-delay:${index * 50}ms`}
      style={{
        animationFillMode: "backwards",
        animationDelay: `${index * 50}ms`,
      }}
    >
      <div
        className={`
          overflow-hidden bg-gray-100
          ${
            isGrid
              ? "aspect-[4/3] w-full"
              : "aspect-square h-full w-24 md:w-40 flex-shrink-0"
          }`}
      >
        <img
          src={"./product.jpg"}
          alt={item.name}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className={`flex flex-col ${isGrid ? "p-4" : "flex-1 p-4 md:p-6"}`}>
        <div className="flex justify-between">
          <h3
            className={`
            font-medium text-gray-900 group-hover:text-black truncate
            ${isGrid ? "text-lg" : "text-xl"}`}
            style={{ maxWidth: isGrid ? "200px" : "900px" }}
          >
            {item.name}
          </h3>

          <h3>
            <b>{item.price} INR</b>
          </h3>
        </div>

        <p
          className={`
            mt-2 text-gray-600 line-clamp-2
            ${isGrid ? "text-sm" : "text-base"}`}
        >
          {item.description}
        </p>
      </div>

      {!isGrid && (
        <button
          onClick={handleDelete}
          className={`
            absolute bottom-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-red-50 text-gray-400 hover:text-red-500
            transition-all duration-200 shadow-sm hover:shadow
            opacity-0 group-hover:opacity-100
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50`}
          aria-label="Delete item"
        >
          <Trash2 size={20} />
        </button>
      )}
    </div>
  );
};

export default DataItem;
