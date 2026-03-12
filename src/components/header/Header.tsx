import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useCart } from "../../hooks/useCart";

export const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <Link to="/" aria-label="Перейти в каталог">
            <img className={styles.logo} src="/logo.svg" alt="AQVEX" />
          </Link>
          <Link className={styles.cartButton} to="/cart" aria-label={`Корзина, ${cartCount} товаров`}>
            <span className={styles.cartBadge} aria-hidden="true">
              {cartCount}
            </span>
            <img className={styles.cartIcon} src="/icons/cart.svg" alt="" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
};
