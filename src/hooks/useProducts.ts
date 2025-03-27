/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useProductContext } from "@/context/ProductContext";
import { useState } from "react";
import Toast from "@/utils/Toast";
import { axiosInstance } from "@/services  /axios.interceptor";
import { API_ROUTES } from "@/lib/constants";
import { IProduct } from "@/types/product";
import { AxiosError } from "axios";

export function useProducts() {
  const { state, dispatch } = useProductContext();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at:desc");
  const [isFetching, setIsFetching] = useState(false);

  const fetchProducts = async (
    page: number,
    limit: number,
    search?: string,
    sortBy?: string
  ) => {
    setIsFetching(true);
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const params: {
        page?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
      } = {};

      if (page) params.page = page;
      if (limit) params.limit = limit;
      if (search) params.search = search;
      if (sortBy) params.sortBy = sortBy;

      const { data } = await axiosInstance.get(API_ROUTES.GET_PRODUCT, {
        params,
      });

      if (data.status) {
        dispatch({
          type: "SET_PRODUCTS",
          payload: { products: data.data.products, total: data.data.total },
        });
      } else {
        Toast("Failed to fetch products", { type: "error" });
      }
    } catch (error: any) {
      Toast(error.response.data.message || "Failed to fetch products", {
        type: "error",
      });
    } finally {
      setIsFetching(false);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const addProduct = async ({
    newProduct,
    props,
  }: {
    newProduct: IProduct;
    props: {
      page?: number;
      limit?: number;
      search?: string;
      sortBy?: string;
    };
  }) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const { page, limit, search, sortBy } = props;
      const { data } = await axiosInstance.post(
        API_ROUTES.POST_PRODUCT,
        newProduct
      );

      if (data) {
        dispatch({ type: "TOGGLE_MODAL", payload: false });

        Toast(data.message || "Product added successfully!", {
          type: "success",
        });

        if (page && limit) {
          fetchProducts(page, limit, search, sortBy);
        }
      } else {
        dispatch({
          type: "ADD_PRODUCT_FAILURE",
          payload: data.message || "Failed to add product",
        });

        Toast(data.message || "Failed to add product", { type: "error" });
      }
    } catch (error: any) {
      dispatch({
        type: "ADD_PRODUCT_FAILURE",
        payload: "Failed to add product",
      });
      Toast(error.response?.data?.message || "Failed to add product", {
        type: "error",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const deleteProduct = async ({
    id,
    props,
  }: {
    id: string;
    props: {
      page?: number;
      limit?: number;
      search?: string;
      sortBy?: string;
    };
  }) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const { page, limit, search, sortBy } = props;

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

        if (page && limit) {
          fetchProducts(page, limit, search, sortBy);
        }
      } else {
        Toast(data.message || "Failed to delete product", { type: "error" });
      }
    } catch (error: any) {
      Toast(error.response.data.message || "Failed to delete product", {
        type: "error",
      });
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
