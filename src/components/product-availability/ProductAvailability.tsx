import styles from "./ProductAvailability.module.css";

interface ProductAvailabilityProps {
  isAvailable: boolean;
  variant?: "card" | "page";
}

export const ProductAvailability = ({ isAvailable, variant = "card" }: ProductAvailabilityProps) => {
  if (variant === "page") {
    return <p className={styles.stockText}>{isAvailable ? "В наличии" : "Нет в наличии"}</p>;
  }

  return (
    <span className={styles.stock}>
      <img
        className={`${styles.stockDot} ${!isAvailable ? styles.stockDotGray : ""}`}
        src="/icons/check.svg"
        alt=""
        aria-hidden="true"
      />
      {isAvailable ? "В наличии" : "Нет в наличии"}
    </span>
  );
};
