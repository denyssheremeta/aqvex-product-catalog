import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className={styles.pagination} aria-label="Пагинация каталога">
      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        type="button"
        aria-label="Предыдущая страница"
      >
        ←
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.page} ${page === currentPage ? styles.active : ""}`}
          onClick={() => onPageChange(page)}
          type="button"
          aria-current={page === currentPage ? "page" : undefined}
          aria-label={`Страница ${page}`}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        type="button"
        aria-label="Следующая страница"
      >
        →
      </button>
    </nav>
  );
};
