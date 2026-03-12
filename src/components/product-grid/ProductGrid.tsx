import styles from "./ProductGrid.module.css";
import type { Product } from "../../types/product";
import { ProductCard } from "../product-card/ProductCard";

interface ProductGridProps {
  products: Product[];
  isInCart: (productId: string, selectedVolumeId: string) => boolean;
  onToggleCart: (product: Product, selectedVolumeId: string) => void;
}

export const ProductGrid = ({ products, isInCart, onToggleCart }: ProductGridProps) => {
  return (
    <section aria-label="Список товаров">
      <ul className={styles.grid}>
        {products.map((product) => (
          <li key={product.id} className={styles.item}>
            <ProductCard product={product} isInCart={isInCart} onToggleCart={onToggleCart} />
          </li>
        ))}
      </ul>
    </section>
  );
};
