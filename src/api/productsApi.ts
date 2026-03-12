import axios from "axios";
import type { Product, ProductsApiResponse } from "../types/product";
import { normalizeProducts } from "../utils/normalizeProducts";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductsApiResponse>("/products");
  const items = response.data.data.products ?? [];
  const normalizedProducts = normalizeProducts(items);

  return Array.from({ length: 3 }, (_, copyIndex) =>
    normalizedProducts.map((product) => ({
      ...product,
      id: `${product.id}-${copyIndex + 1}`,
      slug: `${product.slug}-${copyIndex + 1}`,
    })),
  ).flat();
};
