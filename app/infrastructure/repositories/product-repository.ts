import { getFormatProductDTO } from "@/app/lib/formatters/product";
import { ProductDTO, ProductResponseDTO } from "../http/dto/productDTO";
import { http } from "../instances/http";
import { TProductRepository } from "@/app/domain/repositories/product-repository";

export const productRepository: TProductRepository = {
  getAll: async ({ token }: { token: string }) => {
    console.log('token in repository', token)
    const rs = await http.get<ProductResponseDTO>("/products");
    const { data } = rs;

    return getFormatProductDTO(data.products);
  },
};
