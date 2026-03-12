import styles from "./ProductGrid.module.css";
import type { Product } from "../../types/product";
import { ProductCard } from "../product-card/ProductCard";

interface ProductGridProps {
  products: Product[];
  addedProductIds: string[];
  onToggleCart: (product: Product) => void;
}

export const ProductGrid = ({ products, addedProductIds, onToggleCart }: ProductGridProps) => {
  return (
    <section aria-label="Список товаров">
      <ul className={styles.grid}>
        {products.map((product) => (
          <li key={product.id} className={styles.item}>
            <ProductCard
              product={product}
              isAdded={addedProductIds.includes(product.id)}
              onToggleCart={onToggleCart}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
