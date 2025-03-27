"use client";
import { ProductProvider } from "@/context/ProductContext";
import Product from "@/features/product";

export default function Home() {
  return (
    <>
      <ProductProvider>
        <Product />
      </ProductProvider>
    </>
  );
}
