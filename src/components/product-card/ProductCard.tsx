import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { RatingStars } from "../rating-stars/RatingStars";
import { getDiscountPercent } from "../../utils/getDiscountPercent";
import { formatPrice } from "../../utils/formatPrice";
import { getProductPath } from "../../utils/getProductPath";
import { ProductImage } from "../product-image/ProductImage";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  isInCart: (productId: string, selectedVolumeId: string) => boolean;
  onToggleCart: (product: Product, selectedVolumeId: string) => void;
}

export const ProductCard = ({ product, isInCart, onToggleCart }: ProductCardProps) => {
  const [selectedVolumeId, setSelectedVolumeId] = useState(product.selectedVolumeId);

  const resolvedSelectedVolumeId = product.volumes.some((volume) => volume.id === selectedVolumeId)
    ? selectedVolumeId
    : product.selectedVolumeId;

  const selectedVolume =
    product.volumes.find((volume) => volume.id === resolvedSelectedVolumeId) ?? product.volumes[0] ?? null;

  const isAdded = isInCart(product.id, resolvedSelectedVolumeId);
  const discount = getDiscountPercent(product.oldPrice, product.price, product.discountPercent);
  const hasVolumeOptions = product.volumes.length > 1;
  const isButtonDisabled = !product.isAvailable || (selectedVolume ? !selectedVolume.in_stock : false);

  return (
    <article className={styles.card}>
      <Link className={styles.imageLink} to={getProductPath(product.slug)} aria-label={`Открыть ${product.title}`}>
        <div className={styles.imageWrap}>
          <ProductImage className={styles.image} src={product.image} alt={product.title} />
        </div>
      </Link>

      <div className={styles.priceRow}>
        {product.oldPrice ? <span className={styles.oldPrice}>{product.oldPrice}</span> : <span />}

        <span className={styles.currentPrice}>{formatPrice(product.price, product.currency)}</span>

        {discount > 0 && <span className={styles.discount}>{discount}%</span>}
      </div>

      <h3 className={styles.title}>{product.title}</h3>

      <div className={styles.ratingRow}>
        <RatingStars rating={product.rating} />
        <span className={styles.reviewCount}>{product.reviewCount}</span>
      </div>

      <div className={styles.metaRow}>
        <span className={styles.stock}>
          <img
            className={`${styles.stockDot} ${!product.isAvailable ? styles.stockDotGray : ""}`}
            src="/icons/check.svg"
            alt=""
            aria-hidden="true"
          />
          {product.isAvailable ? "В наличии" : "Нет в наличии"}
        </span>

        <img src="/icons/blob.svg" alt="" aria-hidden="true" />

        <span className={styles.category}>{product.category}</span>
      </div>

      <div className={styles.actionsRow}>
        {hasVolumeOptions && (
          <select
            className={styles.volumeSelect}
            value={resolvedSelectedVolumeId}
            onChange={(event) => setSelectedVolumeId(event.target.value)}
          >
            {product.volumes.map((volume) => (
              <option key={volume.id} value={volume.id} disabled={!volume.in_stock}>
                {volume.label}
              </option>
            ))}
          </select>
        )}

        <button
          className={`${styles.cartButton} ${isAdded ? styles.cartButtonAdded : ""}`}
          type="button"
          onClick={() => onToggleCart(product, resolvedSelectedVolumeId)}
          disabled={isButtonDisabled}
          aria-pressed={isAdded}
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
