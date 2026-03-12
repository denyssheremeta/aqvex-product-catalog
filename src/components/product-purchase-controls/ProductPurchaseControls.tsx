import type { Product } from "../../types/product";
import styles from "./ProductPurchaseControls.module.css";

interface ProductPurchaseControlsProps {
  product: Product;
  selectedVolumeId: string;
  onSelectedVolumeIdChange: (value: string) => void;
  isAdded: boolean;
  isButtonDisabled: boolean;
  onToggleCart: () => void;
  variant?: "card" | "page";
}

export const ProductPurchaseControls = ({
  product,
  selectedVolumeId,
  onSelectedVolumeIdChange,
  isAdded,
  isButtonDisabled,
  onToggleCart,
  variant = "card",
}: ProductPurchaseControlsProps) => {
  const hasVolumeOptions = product.volumes.length > 1;
  const isPageVariant = variant === "page";

  return (
    <div className={`${styles.actionsRow} ${isPageVariant ? styles.actionsRowPage : ""}`}>
      {hasVolumeOptions ? (
        isPageVariant ? (
          <label className={styles.volumeBlock}>
            <span className={styles.volumeLabel}>Обьем</span>
            <select
              className={`${styles.volumeSelect} ${styles.volumeSelectPage}`}
              value={selectedVolumeId}
              onChange={(event) => onSelectedVolumeIdChange(event.target.value)}
            >
              {product.volumes.map((volume) => (
                <option key={volume.id} value={volume.id} disabled={!volume.in_stock}>
                  {volume.label}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <select
            className={styles.volumeSelect}
            value={selectedVolumeId}
            onChange={(event) => onSelectedVolumeIdChange(event.target.value)}
          >
            {product.volumes.map((volume) => (
              <option key={volume.id} value={volume.id} disabled={!volume.in_stock}>
                {volume.label}
              </option>
            ))}
          </select>
        )
      ) : null}

      <button
        className={`${styles.cartButton} ${isPageVariant ? styles.cartButtonPage : ""} ${isAdded ? styles.cartButtonAdded : ""}`}
        type="button"
        onClick={onToggleCart}
        disabled={isButtonDisabled}
        aria-pressed={isAdded}
      >
        <img
          className={`${styles.buttonIcon} ${isPageVariant ? styles.buttonIconPage : ""}`}
          src={isAdded ? "/icons/check.svg" : "/icons/cart.svg"}
          alt=""
          aria-hidden="true"
        />
        {isAdded ? "В корзине" : "В корзину"}
      </button>
    </div>
  );
};
