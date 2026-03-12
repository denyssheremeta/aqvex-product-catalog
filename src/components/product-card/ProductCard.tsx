import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { getProductPath } from "../../utils/getProductPath";
import { ProductAvailability } from "../product-availability/ProductAvailability";
import { ProductImage } from "../product-image/ProductImage";
import { ProductPrice } from "../product-price/ProductPrice";
import { ProductPurchaseControls } from "../product-purchase-controls/ProductPurchaseControls";
import { RatingStars } from "../rating-stars/RatingStars";
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
  const isButtonDisabled = !product.isAvailable || (selectedVolume ? !selectedVolume.in_stock : false);

  return (
    <article className={styles.card}>
      <Link className={styles.imageLink} to={getProductPath(product.slug)} aria-label={`Открыть ${product.title}`}>
        <div className={styles.imageWrap}>
          <ProductImage className={styles.image} src={product.image} alt={product.title} />
        </div>
      </Link>

      <ProductPrice product={product} />

      <h3 className={styles.title}>{product.title}</h3>

      <div className={styles.ratingRow}>
        <RatingStars rating={product.rating} />
        <span className={styles.reviewCount}>{product.reviewCount}</span>
      </div>

      <div className={styles.metaRow}>
        <ProductAvailability isAvailable={product.isAvailable} />

        <img src="/icons/blob.svg" alt="" aria-hidden="true" />

        <span className={styles.category}>{product.category}</span>
      </div>

      <ProductPurchaseControls
        product={product}
        selectedVolumeId={resolvedSelectedVolumeId}
        onSelectedVolumeIdChange={setSelectedVolumeId}
        isAdded={isAdded}
        isButtonDisabled={isButtonDisabled}
        onToggleCart={() => onToggleCart(product, resolvedSelectedVolumeId)}
      />
    </article>
  );
};
