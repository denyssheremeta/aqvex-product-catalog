import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.copyright}>
            <div className={styles.copyrightImages}>
              <img src="/images/logo-small.svg" alt="AQVEX" />
              <img src="/images/made-in-ukraine.svg" alt="Made in Ukraine" />
            </div>
            <small className={styles.copyrightText}>AQVEX © 2026 | Все права защищены</small>
          </div>
          <div className={styles.paymentMethods}>
            <img src="/images/mastercard.svg" alt="Mastercard" />
            <img src="/images/visa.svg" alt="Visa" />
            <img src="/images/apple-pay.svg" alt="Apple Pay" />
            <img src="/images/g-pay.svg" alt="G Pay" />
          </div>
        </div>
      </div>
    </footer>
  );
};
