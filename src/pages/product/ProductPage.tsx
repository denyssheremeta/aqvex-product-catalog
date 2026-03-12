import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductAvailability } from "../../components/product-availability/ProductAvailability";
import { ProductImage } from "../../components/product-image/ProductImage";
import { ProductPrice } from "../../components/product-price/ProductPrice";
import { ProductPurchaseControls } from "../../components/product-purchase-controls/ProductPurchaseControls";
import { RatingStars } from "../../components/rating-stars/RatingStars";
import { ErrorState } from "../../components/ui/ErrorState";
import { Loader } from "../../components/ui/Loader";
import { useCart } from "../../hooks/useCart";
import type { Product } from "../../types/product";
import { NotFoundPage } from "../404/NotFoundPage";
import styles from "./ProductPage.module.css";

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
              <span className={styles.reviewCount}>{product.reviewCount} відгуків</span>
            </div>

            <ProductPrice product={product} variant="page" />
            <ProductAvailability isAvailable={product.isAvailable} variant="page" />

            <ProductPurchaseControls
              product={product}
              selectedVolumeId={resolvedSelectedVolumeId}
              onSelectedVolumeIdChange={setSelectedVolumeId}
              isAdded={isAdded}
              isButtonDisabled={isButtonDisabled}
              onToggleCart={() => toggleCart(product, resolvedSelectedVolumeId)}
              variant="page"
            />
          </div>
        </section>
      </div>
    </main>
  );
};
