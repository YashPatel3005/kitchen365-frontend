export const CONSTANTS = {
  ERROR_MESSAGE: {
    REQUIRED: "This field is required!",
    PRICE_GREAETER: "Price must be greater than 0",
  },
  LABELS: {
    ADD_BUTTON: "Add Product",
  },
  BUTTON_LABEL: {
    CANCEL: "Cancel",
    ADD: "Add",
    DELETE: "Delete",
    LOADING: "Loading",
  },
  FORM_LABEL: {
    NAME: "Name",
    DESCRIPTION: "Description",
    PRICE: "Price",
  },
};

export const TABLE_HEADER = ["Id", "Name", "Description", "Price", "Action"];

export const API_ROUTES = {
  GET_PRODUCT: "/products",
  POST_PRODUCT: "/products",
};

export const ITEMSPERPAGEOPTIONS = [5, 10, 15, 20, 30, 50, 100];
