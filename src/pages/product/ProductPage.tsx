import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ProductPage.module.css";
import { RatingStars } from "../../components/rating-stars/RatingStars";
import { Loader } from "../../components/ui/Loader";
import { ErrorState } from "../../components/ui/ErrorState";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";
import { getDiscountPercent } from "../../utils/getDiscountPercent";
import { NotFoundPage } from "../404/NotFoundPage";
import type { Product } from "../../types/product";
import { ProductImage } from "../../components/product-image/ProductImage";

interface ProductPageProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export const ProductPage = ({ products, isLoading, error }: ProductPageProps) => {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug) ?? null;

  if (isLoading) {
    return (
      <main className={styles.page}>
        <div className="container">
          <Loader count={1} />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <div className="container">
          <ErrorState message={error} />
        </div>
      </main>
    );
  }

  if (!product) {
    return <NotFoundPage />;
  }

  return <ProductDetails key={product.id} product={product} />;
};

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { isInCart, toggleCart } = useCart();
  const [selectedVolumeId, setSelectedVolumeId] = useState(product.selectedVolumeId);

  const resolvedSelectedVolumeId = product.volumes.some((volume) => volume.id === selectedVolumeId)
    ? selectedVolumeId
    : product.selectedVolumeId;

  const selectedVolume =
    product.volumes.find((volume) => volume.id === resolvedSelectedVolumeId) ?? product.volumes[0] ?? null;

  const isAdded = isInCart(product.id, resolvedSelectedVolumeId);
  const discount = getDiscountPercent(product.oldPrice, product.price, product.discountPercent);
  const isButtonDisabled = !product.isAvailable || (selectedVolume ? !selectedVolume.in_stock : false);

  return (
    <main className={styles.page}>
      <div className="container">
        <Link className={styles.backLink} to="/">
          <img className={styles.backLinkArrow} src="/icons/arrow-left.svg" alt="" aria-hidden="true" /> Назад в каталог
        </Link>

        <section className={styles.card}>
          <div className={styles.media}>
            <ProductImage className={styles.image} src={product.image} alt={product.title} />
          </div>

          <div className={styles.content}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.title}>{product.title}</h1>

            <div className={styles.ratingRow}>
              <RatingStars rating={product.rating} />
              <span className={styles.ratingValue}>{product.rating.toFixed(1)}</span>
              <span className={styles.reviewCount}>{product.reviewCount} отзывов</span>
            </div>

            <div className={styles.priceRow}>
              {product.oldPrice ? (
                <span className={styles.oldPrice}>{formatPrice(product.oldPrice, product.currency)}</span>
              ) : null}
              <span className={styles.currentPrice}>{formatPrice(product.price, product.currency)}</span>
              {discount > 0 ? <span className={styles.discount}>-{discount}%</span> : null}
            </div>

            <p className={styles.stock}>{product.isAvailable ? "В наличии" : "Нет в наличии"}</p>

            {product.volumes.length > 1 ? (
              <label className={styles.volumeBlock}>
                <span className={styles.volumeLabel}>Объем</span>
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
              </label>
            ) : null}

            <button
              className={`${styles.cartButton} ${isAdded ? styles.cartButtonAdded : ""}`}
              type="button"
              onClick={() => toggleCart(product, resolvedSelectedVolumeId)}
              disabled={isButtonDisabled}
            >
              <img
                className={styles.buttonIcon}
                src={isAdded ? "/icons/check.svg" : "/icons/cart.svg"}
                alt=""
                aria-hidden="true"
              />
              {isAdded ? "В корзине" : "В корзину"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};
