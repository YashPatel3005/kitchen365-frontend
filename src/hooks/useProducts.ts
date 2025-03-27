/* eslint-disable @typescript-eslint/no-unused-vars */
import { useProductContext } from "@/context/ProductContext";
import { useState } from "react";
import Toast from "@/utils/Toast";
import { axiosInstance } from "@/services  /axios.interceptor";
import { API_ROUTES } from "@/lib/constants";
import { IProduct } from "@/types/product";

export function useProducts() {
  const { state, dispatch } = useProductContext();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [isFetching, setIsFetching] = useState(false);

  const fetchProducts = async (page: number, limit: number, search: string) => {
    setIsFetching(true);
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const { data } = await axiosInstance.get(API_ROUTES.GET_PRODUCT, {
        params: { page, limit, search, sortBy },
      });
      if (data.status) {
        dispatch({
          type: "SET_PRODUCTS",
          payload: { products: data.data.products, total: data.data.total },
        });
      } else {
        Toast("Failed to fetch products", { type: "error" });
      }
    } catch (error) {
      Toast("Failed to fetch products", { type: "error" });
    } finally {
      setIsFetching(false);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const addProduct = async (newProduct: IProduct) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const { data } = await axiosInstance.post(
        API_ROUTES.POST_PRODUCT,
        newProduct
      );
      if (data.status) {
        dispatch({ type: "ADD_PRODUCT_SUCCESS", payload: data.data });
        dispatch({ type: "TOGGLE_MODAL", payload: false });
        Toast(data.message || "Product added successfully!", {
          type: "success",
        });
      } else {
        dispatch({
          type: "ADD_PRODUCT_FAILURE",
          payload: data.message || "Failed to add product",
        });
        Toast(data.message || "Failed to add product", { type: "error" });
      }
    } catch (error) {
      dispatch({
        type: "ADD_PRODUCT_FAILURE",
        payload: "Failed to add product",
      });
      Toast("Failed to add product", { type: "error" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const deleteProduct = async (id: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const { data } = await axiosInstance.delete(
        `${API_ROUTES.POST_PRODUCT}/${id}`
      );
      if (data.status) {
        Toast(data.message || "Product deleted successfully!", {
          type: "success",
        });
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({ type: "DELETE_PRODUCT", payload: id });
        dispatch({ type: "DELETE_MODAL", payload: false });
      } else {
        Toast(data.message || "Failed to delete product", { type: "error" });
      }
    } catch (error) {
      Toast("Failed to delete product", { type: "error" });
    }
  };

  return {
    ...state,
    isFetching,
    fetchProducts,
    addProduct,
    deleteProduct,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    sortBy,
    setSortBy,
  };
}
