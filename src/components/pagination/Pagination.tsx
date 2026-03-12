import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PAGINATION_SIBLINGS = 1;

const getVisiblePages = (currentPage: number, totalPages: number): Array<number | "ellipsis"> => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>();
  const startPage = Math.max(2, currentPage - PAGINATION_SIBLINGS);
  const endPage = Math.min(totalPages - 1, currentPage + PAGINATION_SIBLINGS);

  pages.add(1);

  for (let page = startPage; page <= endPage; page += 1) {
    pages.add(page);
  }

  pages.add(totalPages);

  if (currentPage <= 3) {
    pages.add(2);
    pages.add(3);
  }

  if (currentPage >= totalPages - 2) {
    pages.add(totalPages - 1);
    pages.add(totalPages - 2);
  }

  const sortedPages = Array.from(pages).sort((first, second) => first - second);
  const visiblePages: Array<number | "ellipsis"> = [];

  sortedPages.forEach((page, index) => {
    const previousPage = sortedPages[index - 1];

    if (previousPage && page - previousPage > 1) {
      visiblePages.push("ellipsis");
    }

    visiblePages.push(page);
  });

  return visiblePages;
};

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        type="button"
        aria-label="Previous page"
      >
        <img className={styles.arrowIcon} src="/icons/arrow-left.svg" alt="" aria-hidden="true" />
      </button>

      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className={styles.ellipsis} aria-hidden="true">
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`${styles.page} ${page === currentPage ? styles.active : ""}`}
            onClick={() => onPageChange(page)}
            type="button"
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        ),
      )}

      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        type="button"
        aria-label="Next page"
      >
        <img className={styles.arrowIcon} src="/icons/arrow-right.svg" alt="" aria-hidden="true" />
      </button>
    </nav>
  );
};
