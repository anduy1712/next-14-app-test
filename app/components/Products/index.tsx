"use client";

import { Product } from "@/app/domain/models/product";
import { productService } from "@/app/domain/services/product-service";
import { productRepository } from "@/app/infrastructure/repositories/product-repository";
import React, { useEffect } from "react";

const Products = () => {
  const [products, setProducts] = React.useState<Product[]>([]);

  const fetchProducts = async () => {
    const data = await productService(productRepository).getAll();
    console.log("data", data);
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <h1>{products.length > 0 && products[0].productTitle}</h1>
      <p>test 12345</p>
    </div>
  );
};

export default Products;
