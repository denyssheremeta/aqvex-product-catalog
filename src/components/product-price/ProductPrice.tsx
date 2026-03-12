import type { Product } from "../../types/product";
import { formatPrice } from "../../utils/formatPrice";
import { getDiscountPercent } from "../../utils/getDiscountPercent";
import styles from "./ProductPrice.module.css";

interface ProductPriceProps {
  product: Product;
  variant?: "card" | "page";
}

export const ProductPrice = ({ product, variant = "card" }: ProductPriceProps) => {
  const discount = getDiscountPercent(product.oldPrice, product.price, product.discountPercent);
  const isPageVariant = variant === "page";

  return (
    <div className={`${styles.priceRow} ${isPageVariant ? styles.priceRowPage : ""}`}>
      {product.oldPrice ? (
        <span className={`${styles.oldPrice} ${isPageVariant ? styles.oldPricePage : ""}`}>{product.oldPrice}</span>
      ) : (
        <span className={styles.placeholder} aria-hidden="true" />
      )}

      <span className={`${styles.currentPrice} ${isPageVariant ? styles.currentPricePage : ""}`}>
        {formatPrice(product.price, product.currency)}
      </span>

      {discount > 0 ? (
        <span className={`${styles.discount} ${isPageVariant ? styles.discountPage : ""}`}>{`${discount}%`}</span>
      ) : null}
    </div>
  );
};
