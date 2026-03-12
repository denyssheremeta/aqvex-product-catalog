import styles from "./Header.module.css";
import { useCart } from "../../hooks/useCart";

export const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <img className={styles.logo} src="/logo.svg" alt="AQVEX" />
          <button className={styles.cartButton} type="button" aria-label={`Корзина, ${cartCount} товарів`}>
            <span className={styles.cartBadge} aria-hidden="true">
              {cartCount}
            </span>
            <img className={styles.cartIcon} src="/icons/cart.svg" alt="" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};
