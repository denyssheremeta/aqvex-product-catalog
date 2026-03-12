import { useEffect, useMemo, useState } from "react";
import styles from "./ProductCard.module.css";
import type { Product } from "../../types/product";
import { getDiscountPercent } from "../../utils/getDiscountPercent";
import { formatPrice } from "../../utils/formatPrice";

interface ProductCardProps {
  product: Product;
  isAdded: boolean;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, isAdded, onAddToCart }: ProductCardProps) => {
  const [selectedVolumeId, setSelectedVolumeId] = useState(product.selectedVolumeId);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedVolumeId(product.selectedVolumeId);
  }, [product.selectedVolumeId]);

  const selectedVolume = useMemo(() => {
    return product.volumes.find((volume) => volume.id === selectedVolumeId) ?? product.volumes[0] ?? null;
  }, [product.volumes, selectedVolumeId]);

  const discount = getDiscountPercent(product.oldPrice, product.price, product.discountPercent);

  const isButtonDisabled = isAdded || !product.isAvailable || (selectedVolume ? !selectedVolume.in_stock : false);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img className={styles.image} src={product.image} alt={product.title} />
      </div>

      <div className={styles.priceRow}>
        {product.oldPrice ? (
          <span className={styles.oldPrice}>{formatPrice(product.oldPrice, product.currency)}</span>
        ) : (
          <span />
        )}

        <span className={styles.currentPrice}>{formatPrice(product.price, product.currency)}</span>

        {discount > 0 && <span className={styles.discount}>-{discount}%</span>}
      </div>

      <h3 className={styles.title}>{product.title}</h3>

      <div className={styles.ratingRow}>
        <span className={styles.stars}>★★★★★</span>
        <span className={styles.reviewCount}>{product.reviewCount}</span>
      </div>

      <div className={styles.metaRow}>
        <span className={styles.stock}>
          <span className={styles.stockDot} />
          {product.isAvailable ? "В наличии" : "Нет в наличии"}
        </span>

        <span className={styles.delivery}>{product.category}</span>
      </div>

      <div className={styles.actionsRow}>
        <select
          className={styles.volumeSelect}
          value={selectedVolumeId}
          onChange={(event) => setSelectedVolumeId(event.target.value)}
        >
          {product.volumes.map((volume) => (
            <option key={volume.id} value={volume.id} disabled={!volume.in_stock}>
              {volume.label}
            </option>
          ))}
        </select>

        <button
          className={`${styles.cartButton} ${isAdded ? styles.cartButtonAdded : ""}`}
          type="button"
          onClick={() => onAddToCart(product)}
          disabled={isButtonDisabled}
        >
          <img
            className={styles.buttonIcon}
            src={isAdded ? "/icons/check.svg" : "/icons/cart.svg"}
            aria-hidden="true"
            alt=""
          />

          {isAdded ? "В корзине" : "В корзину"}
        </button>
      </div>
    </article>
  );
};
