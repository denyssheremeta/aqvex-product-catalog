import type { Product } from "../types/product";
import type { SortOption } from "../constants/sortOptions";

export const sortProducts = (products: Product[], sortBy: SortOption): Product[] => {
  const copy = [...products];

  switch (sortBy) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);

    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);

    case "title-asc":
      return copy.sort((a, b) => a.title.localeCompare(b.title, "ru"));

    case "rating-desc":
      return copy.sort((a, b) => b.rating - a.rating);

    case "popular":
    default:
      return copy.sort((a, b) => b.reviewCount - a.reviewCount);
  }
};
