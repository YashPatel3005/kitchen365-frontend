import { createContext, useReducer, useContext, ReactNode } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  created_at?: string;
}

interface State {
  products: Product[];
  loading: boolean;
  modalOpen: boolean;
  deleteModalOpen: boolean;
  total: number;
  viewProduct: Product;
}

export type Action =
  | { type: "SET_PRODUCTS"; payload: { products: Product[]; total: number } }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: string }
  | { type: "TOGGLE_MODAL"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "DELETE_MODAL"; payload: boolean }
  | { type: "ADD_PRODUCT_SUCCESS"; payload: Product }
  | { type: "ADD_PRODUCT_FAILURE"; payload: string }
  | { type: "VIEW_PRODUCT"; payload: Product };

const initialState: State = {
  products: [],
  loading: false,
  modalOpen: false,
  deleteModalOpen: false,
  total: 0,
  viewProduct: {
    id: "",
    name: "",
    price: 0,
    created_at: "",
    description: "",
  },
};

// Reducer Function
const productReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload.products,
        total: action.payload.total,
      };
    case "ADD_PRODUCT_SUCCESS":
      return { ...state, products: [...state.products, action.payload] };
    case "ADD_PRODUCT_FAILURE":
      return state;
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    case "TOGGLE_MODAL":
      return { ...state, modalOpen: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "DELETE_MODAL":
      return { ...state, deleteModalOpen: action.payload };
    case "VIEW_PRODUCT":
      return { ...state, viewProduct: action.payload };
    default:
      return state;
  }
};

const ProductContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

// Custom Hook for using context
export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProductContext must be used within ProductProvider");
  return context;
}
