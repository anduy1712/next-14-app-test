export type ProductDTO = { id: number; title: string; description: string };

export type ProductResponseDTO = {
  products: ProductDTO[];
  total: number;
};
