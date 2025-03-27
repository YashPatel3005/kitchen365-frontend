"use client";
/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { Button, CustomSearchBar, Loader, Modal } from "@/components";
import { useProductContext } from "@/context/ProductContext";
import { useProducts } from "@/hooks/useProducts";
import Pagination from "@/components/ui/Pagination";
import AddProduct from "./pages/AddProduct";
import DeleteProduct from "./pages/DeleteProduct";
import { CONSTANTS } from "@/lib/constants";
import ViewToggle from "@/components/ViewToggle";
import { ArrowUpDown, PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import DataItem from "@/components/DataItem";

export default function BasicTableOne() {
  const { dispatch, state } = useProductContext();

  const [view, setView] = useState<string>(
    typeof window !== "undefined"
      ? localStorage.getItem("viewPreference") ?? "grid"
      : "grid"
  );

  const [sortBy, setSortBy] = useState("created_at");

  const {
    products,
    setSearch,
    setPage,
    page,
    limit,
    total,
    setLimit,
    fetchProducts,
    search,
  } = useProducts();

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    let sort = "";
    if (sortBy) {
      switch (sortBy) {
        case "name":
          sort = "name:asc";
          break;
        case "price":
          sort = "price:asc";
          break;
        default:
          sort = "created_at:desc";
      }
    }
    fetchProducts(page, limit, search, sort);
  }, [page, limit, search, sortBy]);

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleItemsPerPageChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleFindId = (product_id: string) => {
    const selectedProduct = products.find(
      (product) => product.id === product_id
    );
    if (selectedProduct)
      dispatch({ type: "VIEW_PRODUCT", payload: selectedProduct });
  };

  const handleViewChange = (newView: string) => {
    setView(newView);
    localStorage.setItem("viewPreference", newView);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-12 md:py-20">
      {state.loading && <Loader />}
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-8">
          <ViewToggle view={view} onChange={handleViewChange} />

          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:gap-3">
            <CustomSearchBar onSearch={setSearch} />

            <div className="flex items-center gap-2 w-[180px]">
              <ArrowUpDown className="text-gray-500" size={16} />
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value)}
              >
                <SelectTrigger className="w-[160px] bg-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="created_at">Date (Newest)</SelectItem>
                  <SelectItem value="price">Price (Lowest)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="primary"
              size="sm"
              className="w-40 cursor-pointer text-white"
              onClick={() => dispatch({ type: "TOGGLE_MODAL", payload: true })}
              startIcon={<PlusCircle className="mr-1" size={16} />}
            >
              {CONSTANTS.LABELS.ADD_BUTTON}
            </Button>
          </div>
        </div>

        <div className="relative">
          <div key={view} className="animate-fade-in">
            {products.length > 0 ? (
              view === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((item, index) => (
                    <DataItem
                      key={item.id}
                      item={{ ...item, description: item.description || "" }}
                      view="grid"
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  {products.map((item, index) => (
                    <DataItem
                      key={item.id}
                      item={{ ...item, description: item.description || "" }}
                      view="list"
                      index={index}
                      onDelete={() => {
                        handleFindId(item.id);
                        dispatch({ type: "DELETE_MODAL", payload: true });
                      }}
                    />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            )}
          </div>
        </div>

        {products.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={limit}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}

        {/* Add Product Modal */}
        <Modal
          isOpen={state.modalOpen}
          onClose={() => dispatch({ type: "TOGGLE_MODAL", payload: false })}
          children={<AddProduct />}
          className="max-w-400px p-5"
          isFullscreen={false}
          title="Add Product"
        />

        {/* Delete Product Modal */}
        <Modal
          isOpen={state.deleteModalOpen}
          onClose={() => dispatch({ type: "DELETE_MODAL", payload: false })}
          children={<DeleteProduct />}
          className="max-w-400px p-3"
          isFullscreen={false}
          title="Delete Product"
        />
      </div>
    </div>
  );
}
