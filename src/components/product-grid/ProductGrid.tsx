import styles from "./ProductGrid.module.css";
import type { Product } from "../../types/product";
import { ProductCard } from "../product-card/ProductCard";

interface ProductGridProps {
  products: Product[];
  addedProductIds: string[];
  onAddToCart: (product: Product) => void;
}

export const ProductGrid = ({ products, addedProductIds, onAddToCart }: ProductGridProps) => {
  return (
    <section className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isAdded={addedProductIds.includes(product.id)}
          onAddToCart={onAddToCart}
        />
      ))}
    </section>
  );
};
