import axios from "axios";
import type { Product, ProductsApiResponse } from "../types/product";
import { normalizeProducts } from "../utils/normalizeProducts";

const api = axios.create({
  baseURL: "https://ip-194-99-21-145-139178.vps.hosted-by-mvps.net/api/v1",
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductsApiResponse>("/products");
  const items = response.data.data.products ?? [];

  return normalizeProducts(items);
};
