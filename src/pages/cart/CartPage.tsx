import { Link } from "react-router-dom";
import styles from "./CartPage.module.css";
import { Loader } from "../../components/ui/Loader";
import { ErrorState } from "../../components/ui/ErrorState";
import { EmptyState } from "../../components/ui/EmptyState";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";
import { getProductPath } from "../../utils/getProductPath";
import type { Product } from "../../types/product";

interface CartPageProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export const CartPage = ({ products, isLoading, error }: CartPageProps) => {
  const { cartItems, toggleCart } = useCart();

  const cartProducts = cartItems
    .map((item) => {
      const product = products.find((candidate) => candidate.id === item.productId);

      if (!product) {
        return null;
      }

      return {
        ...product,
        selectedVolumeId: item.selectedVolumeId || product.selectedVolumeId,
      };
    })
    .filter((product): product is Product => product !== null);

  const totalPrice = cartProducts.reduce((sum, product) => sum + product.price, 0);
  const totalOldPrice = cartProducts.reduce((sum, product) => sum + (product.oldPrice ?? product.price), 0);
  const savings = totalOldPrice - totalPrice;

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.heading}>
          <div>
            <h1 className={styles.title}>Ваша корзина</h1>
            <p className={styles.subtitle}>Проверьте состав корзины перед оформлением заказа.</p>
          </div>

          <Link className={styles.backLink} to="/">
            Продолжить покупки
          </Link>
        </div>

        {isLoading ? (
          <div className={styles.contentState}>
            <Loader count={4} />
          </div>
        ) : error ? (
          <div className={styles.contentState}>
            <ErrorState message={error} />
          </div>
        ) : cartProducts.length === 0 ? (
          <div className={styles.contentState}>
            <EmptyState message="Нет добавленных товаров" />
          </div>
        ) : (
          <div className={styles.layout}>
            <section className={styles.listSection} aria-label="Товары в корзине">
              <ul className={styles.list}>
                {cartProducts.map((product) => {
                  const selectedVolumeLabel = product.volumes.find((volume) => volume.id === product.selectedVolumeId)?.label;

                  return (
                    <li key={`${product.id}-${product.selectedVolumeId}`} className={styles.item}>
                      <Link className={styles.imageLink} to={getProductPath(product.slug)} aria-label={`Открыть ${product.title}`}>
                        <img className={styles.image} src={product.image} alt={product.title} />
                      </Link>

                      <div className={styles.info}>
                        <span className={styles.category}>{product.category}</span>
                        <h2 className={styles.productTitle}>
                          <Link to={getProductPath(product.slug)}>{product.title}</Link>
                        </h2>
                        {selectedVolumeLabel ? <p className={styles.category}>{selectedVolumeLabel}</p> : null}
                        <p className={styles.stock}>{product.isAvailable ? "В наличии" : "Нет в наличии"}</p>
                      </div>

                      <div className={styles.meta}>
                        {product.oldPrice ? (
                          <span className={styles.oldPrice}>{formatPrice(product.oldPrice, product.currency)}</span>
                        ) : null}
                        <strong className={styles.price}>{formatPrice(product.price, product.currency)}</strong>
                        <button
                          className={styles.removeButton}
                          type="button"
                          onClick={() => toggleCart(product, product.selectedVolumeId)}
                        >
                          Удалить
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            <aside className={styles.summary} aria-label="Сводка по корзине">
              <div className={styles.summaryCard}>
                <h2 className={styles.summaryTitle}>Итого</h2>

                <dl className={styles.summaryList}>
                  <div className={styles.summaryRow}>
                    <dt>Товаров</dt>
                    <dd>{cartProducts.length}</dd>
                  </div>
                  <div className={styles.summaryRow}>
                    <dt>Сумма</dt>
                    <dd>{formatPrice(totalPrice, cartProducts[0]?.currency)}</dd>
                  </div>
                  <div className={styles.summaryRow}>
                    <dt>Экономия</dt>
                    <dd>{formatPrice(savings, cartProducts[0]?.currency)}</dd>
                  </div>
                </dl>

                <Link className={styles.checkoutButton} to="/">
                  Вернуться в каталог
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};
