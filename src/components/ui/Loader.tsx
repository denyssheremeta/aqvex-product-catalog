import styles from "./Loader.module.css";

interface LoaderProps {
  count?: number;
}

export const Loader = ({ count = 8 }: LoaderProps) => {
  return (
    <section className={styles.grid} aria-label="Загрузка товаров" aria-busy="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={styles.card}>
          <div className={`${styles.block} ${styles.image}`} />

          <div className={styles.priceRow}>
            <div className={`${styles.block} ${styles.priceSmall}`} />
            <div className={`${styles.block} ${styles.priceLarge}`} />
          </div>

          <div className={`${styles.block} ${styles.title}`} />
          <div className={`${styles.block} ${styles.meta}`} />
          <div className={`${styles.block} ${styles.meta}`} />

          <div className={styles.actions}>
            <div className={`${styles.block} ${styles.select}`} />
            <div className={`${styles.block} ${styles.button}`} />
          </div>
        </div>
      ))}
    </section>
  );
};
