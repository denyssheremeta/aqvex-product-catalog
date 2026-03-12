import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <img className={styles.logo} src="/logo.svg" alt="AQVEX" />
        </div>
      </div>
    </header>
  );
};
