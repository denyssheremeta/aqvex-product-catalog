export type SortOption = "popular" | "price-asc" | "price-desc" | "title-asc" | "rating-desc";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popular", label: "По популярности" },
  { value: "price-asc", label: "От дешевых к дорогим" },
  { value: "price-desc", label: "От дорогих к дешевым" },
  { value: "title-asc", label: "По названию" },
  { value: "rating-desc", label: "По рейтингу" },
];
