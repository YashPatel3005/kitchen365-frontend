import { Button } from "@/components";
import { useProductContext } from "@/context/ProductContext";
import { useProducts } from "@/hooks/useProducts";
import { CONSTANTS } from "@/lib/constants";
import React from "react";

const DeleteProduct = () => {
  const { dispatch, state } = useProductContext();
  const { deleteProduct } = useProducts();
  return (
    <>
      {" "}
      <div className="min-w-125 mx-auto rounded-lg p-2 mt-5">
        <span className="text-[20px] text-gray-600 ">
          {`Are you sure you want to delete this product ${state.viewProduct.name}?`}
        </span>
        <div className="flex justify-end space-x-3 mt-5 mb-5">
          <Button
            variant="primary"
            size="md"
            className="rounded-sm"
            type="button"
            onClick={() => dispatch({ type: "DELETE_MODAL", payload: false })}
          >
            {CONSTANTS.BUTTON_LABEL.CANCEL}
          </Button>
          <Button
            variant="primary"
            size="md"
            className="rounded-sm"
            type="button"
            onClick={() => {
              deleteProduct(state.viewProduct.id);
            }}
          >
            {state.loading
              ? CONSTANTS.BUTTON_LABEL.LOADING
              : CONSTANTS.BUTTON_LABEL.DELETE}
          </Button>
        </div>
      </div>
    </>
  );
};

export default DeleteProduct;
