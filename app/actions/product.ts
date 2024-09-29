import { cookies } from "next/headers";
import { productService } from "../domain/services/product-service";
import { productRepository } from "../infrastructure/repositories/product-repository";

export const products = async () => {
  const token = "";
  const resp = await productService(productRepository).getAll({ token: token });
  return resp;
};
