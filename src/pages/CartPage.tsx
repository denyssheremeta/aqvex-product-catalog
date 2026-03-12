import styles from "./CartPage.module.css";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { Loader } from "../components/ui/Loader";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatPrice";
import type { Product } from "../types/product";

interface CartPageProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export const CartPage = ({ products, isLoading, error }: CartPageProps) => {
  const { addedProductIds, toggleCart } = useCart();

  const cartProducts = products.filter((product) => addedProductIds.includes(product.id));
  const totalPrice = cartProducts.reduce((sum, product) => sum + product.price, 0);
  const totalOldPrice = cartProducts.reduce((sum, product) => sum + (product.oldPrice ?? product.price), 0);
  const savings = totalOldPrice - totalPrice;

  return (
    <>
      <Header />

      <main className={styles.page}>
        <div className="container">
          <div className={styles.heading}>
            <div>
              <p className={styles.eyebrow}>Корзина</p>
              <h1 className={styles.title}>Товары, которые вы выбрали</h1>
              <p className={styles.subtitle}>Проверьте состав корзины перед оформлением заказа.</p>
            </div>

            <a className={styles.backLink} href="#/">
              Продолжить покупки
            </a>
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
              <EmptyState message="Ваша корзина пока пуста" />
            </div>
          ) : (
            <div className={styles.layout}>
              <section className={styles.listSection} aria-label="Товары в корзине">
                <ul className={styles.list}>
                  {cartProducts.map((product) => (
                    <li key={product.id} className={styles.item}>
                      <img className={styles.image} src={product.image} alt={product.title} />

                      <div className={styles.info}>
                        <span className={styles.category}>{product.category}</span>
                        <h2 className={styles.productTitle}>{product.title}</h2>
                        <p className={styles.stock}>{product.isAvailable ? "В наличии" : "Нет в наличии"}</p>
                      </div>

                      <div className={styles.meta}>
                        {product.oldPrice ? (
                          <span className={styles.oldPrice}>{formatPrice(product.oldPrice, product.currency)}</span>
                        ) : null}
                        <strong className={styles.price}>{formatPrice(product.price, product.currency)}</strong>
                        <button className={styles.removeButton} type="button" onClick={() => toggleCart(product)}>
                          Удалить
                        </button>
                      </div>
                    </li>
                  ))}
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

                  <a className={styles.checkoutButton} href="#/">
                    Вернуться в каталог
                  </a>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};
