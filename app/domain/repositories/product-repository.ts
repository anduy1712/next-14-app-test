import { Product } from "../models/product";

export type TProductRepository = {
  getAll: () => Promise<Product[]>;
};
