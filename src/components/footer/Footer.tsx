import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div>AQVEX © 2026 | Все права защищены</div>
          <div>Mastercard · Visa · Apple Pay · G Pay</div>
        </div>
      </div>
    </footer>
  );
};
