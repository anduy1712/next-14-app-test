import {
  TLoginDTO
} from "@/app/infrastructure/http/dto/authDTO";
import { TProductRepository } from "../repositories/product-repository";

export const productService = (repository: TProductRepository) => ({
  getAll: () => {
    const login = repository.getAll();
    return login;
  },
});
