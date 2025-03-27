import { Action, Product } from "@/context/ProductContext";

export interface IProduct {
  name: string;
  price: number;
  description?: string;
}

export interface ProductProps {
  products: Product[];
  isFetching: boolean;
  handleFindId: (product_id: string) => void;
  dispatch: React.Dispatch<Action>;
}

export interface ActionButtonProps {
  product: Product;
  handleFindId: (product_id: string) => void;
  dispatch: React.Dispatch<Action>;
}
