import { Link } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import styles from "./NotFoundPage.module.css";

export const NotFoundPage = () => {
  return (
    <>
      <Header />

      <main className={styles.page}>
        <div className="container">
          <section className={styles.card} aria-labelledby="not-found-title">
            <p className={styles.code}>404</p>
            <h1 id="not-found-title" className={styles.title}>
              Страница не найдена
            </h1>
            <p className={styles.description}>Вернитесь к каталогу.</p>
            <Link className={styles.link} to="/">
              Перейти в каталог
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};
