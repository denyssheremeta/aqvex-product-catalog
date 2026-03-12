import axios from "axios";
import type { Product, ProductsApiResponse } from "../types/product";
import { normalizeProducts } from "../utils/normalizeProducts";

const defaultApiUrl = "/api/v1";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultApiUrl,
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductsApiResponse>("/products");
  const items = response.data.data.products ?? [];

  return normalizeProducts(items);
};
