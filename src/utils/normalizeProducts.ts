import type { Product, RawProduct } from "../types/product";

export const normalizeProducts = (items: RawProduct[]): Product[] => {
  return items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.name,
    image: `/images/products/${item.image}`,
    price: item.price,
    oldPrice: item.old_price ?? null,
    discountPercent: item.discount_percent ?? 0,
    currency: item.currency ?? "грн",
    rating: item.rating ?? 0,
    reviewCount: item.reviews_count ?? 0,
    isAvailable: item.in_stock,
    category: item.category,
    volumes: item.volumes ?? [],
    selectedVolumeId: item.selected_volume_id,
  }));
};
