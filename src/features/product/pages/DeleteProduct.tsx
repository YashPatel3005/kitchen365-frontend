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
      <div className="min-w-125 mx-auto rounded-lg">
        <span className="text-[18px] text-gray-500 ">
          {`Are you sure you want to delete this product ${state.viewProduct.name}?`}
        </span>
        <div className="flex justify-end space-x-3 mt-5 mb-4">
          <Button
            variant="primary"
            size="sm"
            className="rounded-sm text-white"
            type="button"
            onClick={() => dispatch({ type: "DELETE_MODAL", payload: false })}
            disabled={state.loading}
          >
            {CONSTANTS.BUTTON_LABEL.CANCEL}
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="rounded-sm text-white"
            type="button"
            disabled={state.loading}
            onClick={() => {
              deleteProduct(state.viewProduct.id);
            }}
          >
            {state.loading
              ? CONSTANTS.BUTTON_LABEL.DELETING
              : CONSTANTS.BUTTON_LABEL.DELETE}
          </Button>
        </div>
      </div>
    </>
  );
};

export default DeleteProduct;
