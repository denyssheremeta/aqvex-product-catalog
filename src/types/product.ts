export interface ProductVolume {
  id: string;
  label: string;
  in_stock: boolean;
}

export interface RawProduct {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  old_price: number | null;
  discount_percent: number;
  currency: string;
  rating: number;
  reviews_count: number;
  in_stock: boolean;
  category: string;
  volumes: ProductVolume[];
  selected_volume_id: string;
}

export interface ProductsApiResponse {
  success: boolean;
  data: {
    products: RawProduct[];
  };
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  oldPrice: number | null;
  discountPercent: number;
  currency: string;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  category: string;
  volumes: ProductVolume[];
  selectedVolumeId: string;
}
