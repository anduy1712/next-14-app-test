import { TProductRepository } from "../repositories/product-repository";

export const productService = (repository: TProductRepository) => ({
  getAll: (params: any) => {
    const login = repository.getAll(params);
    return login;
  },
});
