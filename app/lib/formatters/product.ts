import { Product } from "@/app/domain/models/product";
import { ProductDTO } from "../../infrastructure/http/dto/productDTO";

export const getFormatProductDTO = (products: ProductDTO[]): Product[] => {
  return products.map((product) => ({
    productID: product.id,
    productTitle: product.title,
    content: product.description,
  }));
};
