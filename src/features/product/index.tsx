"use client";
/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/DataTable";
import { Button, CustomSearchBar, Loader, Modal } from "@/components";
import { Product, useProductContext } from "@/context/ProductContext";
import { useProducts } from "@/hooks/useProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/components/ui/Pagination";
import AddProduct from "./pages/AddProduct";
import DeleteProduct from "./pages/DeleteProduct";
import { CONSTANTS, TABLE_HEADER } from "@/lib/constants";
import { ActionButtonProps, ProductProps } from "@/types/product";

const TableHeaderComponent = () => (
  <TableHeader className="border-b border-gray-200 font-[900] text-[18px] text-neutral-950 bg-primary">
    <TableRow>
      {TABLE_HEADER.map((headerItem, index) => (
        <TableCell
          isHeader
          key={index}
          className="px-5 py-3 text-neutral-950 font-[600] text-start text-theme-xs"
        >
          {headerItem}
        </TableCell>
      ))}
    </TableRow>
  </TableHeader>
);

const ActionButtons = ({
  product,
  handleFindId,
  dispatch,
}: ActionButtonProps) => (
  <div className="flex ml-5">
    <FontAwesomeIcon
      icon={faTrash}
      color="red"
      className="cursor-pointer text-gray-500 opacity-70 hover:opacity-100 hover:text-red-600"
      onClick={() => {
        handleFindId(product.id);
        dispatch({ type: "DELETE_MODAL", payload: true });
      }}
    />
  </div>
);

const TableBodyComponent = ({
  products,
  isFetching,
  handleFindId,
  dispatch,
}: ProductProps) => (
  <TableBody className="divide-y divide-gray-200">
    {products.length > 0 ? (
      products.map((product: Product) => (
        <TableRow key={product.id}>
          <TableCell className="px-5 py-4 sm:px-6 text-start">
            {product.id}
          </TableCell>
          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
            {product.name}
          </TableCell>
          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
            {product.description || "-"}
          </TableCell>
          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
            {product.price}
          </TableCell>
          <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
            <ActionButtons
              product={product}
              handleFindId={handleFindId}
              dispatch={dispatch}
            />
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell className="px-4 py-3 text-center text-gray-500 font-[600]">
          {isFetching ? CONSTANTS.BUTTON_LABEL.LOADING : "No data found"}
        </TableCell>
      </TableRow>
    )}
  </TableBody>
);

export default function BasicTableOne() {
  const { dispatch, state } = useProductContext();
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
    isFetching,
  } = useProducts();

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    fetchProducts(page, limit, search);
  }, [page, limit, search]);

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

  return (
    <div className="p-10">
      {state.loading && <Loader />}
      <div className="flex justify-end items-end">
        <div className="mr-4">
          <CustomSearchBar onSearch={setSearch} />
        </div>
        <Button
          variant="primary"
          size="md"
          className="w-40 cursor-pointer"
          onClick={() => dispatch({ type: "TOGGLE_MODAL", payload: true })}
          startIcon={
            <FontAwesomeIcon
              icon={faPlus}
              color="red"
              className="cursor-pointer text-gray-500 opacity-70 hover:opacity-100 hover:text-red-600"
            />
          }
        >
          {CONSTANTS.LABELS.ADD_BUTTON}
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white mt-10">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              <TableHeaderComponent />
              <TableBodyComponent
                products={products}
                isFetching={isFetching}
                handleFindId={handleFindId}
                dispatch={dispatch}
              />
            </Table>
          </div>
        </div>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={limit}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      {/* Add Product Modal */}
      <Modal
        isOpen={state.modalOpen}
        onClose={() => dispatch({ type: "TOGGLE_MODAL", payload: false })}
        children={<AddProduct />}
        className="max-w-400px"
        isFullscreen={false}
        title="Add Product"
      />

      {/* Delete Product Modal */}
      <Modal
        isOpen={state.deleteModalOpen}
        onClose={() => dispatch({ type: "DELETE_MODAL", payload: false })}
        children={<DeleteProduct />}
        className="max-w-400px"
        isFullscreen={false}
        title="Delete Product"
      />
    </div>
  );
}
