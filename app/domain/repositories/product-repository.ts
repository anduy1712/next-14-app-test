import { Product } from "../models/product";

export type TProductRepository = {
  getAll: ({ token }: { token: string }) => Promise<Product[]>;
};
