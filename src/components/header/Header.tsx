import styles from "./Header.module.css";
import { useCart } from "../../hooks/useCart";

export const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <a href="#/" aria-label="Перейти в каталог">
            <img className={styles.logo} src="/logo.svg" alt="AQVEX" />
          </a>
          <a className={styles.cartButton} href="#/cart" aria-label={`Корзина, ${cartCount} товарів`}>
            <span className={styles.cartBadge} aria-hidden="true">
              {cartCount}
            </span>
            <img className={styles.cartIcon} src="/icons/cart.svg" alt="" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
};
