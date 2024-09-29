"use client";

import { products } from "@/app/actions";
import { productService } from "@/app/domain/services/product-service";
import { productRepository } from "@/app/infrastructure/repositories/product-repository";
import useSWR from "swr";

const Products = () => {
  const { data, isLoading, error } = useSWR("products", () =>
    products()
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data?.map((item, index) => (
        <h1 key={index}>{item.productTitle}</h1>
      ))}
    </div>
  );
};

export default Products;
