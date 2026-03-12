import { useMemo, useState } from "react";
import styles from "./CatalogPage.module.css";
import { CatalogToolbar } from "../../components/catalog-toolbar/CatalogToolbar";
import { ProductGrid } from "../../components/product-grid/ProductGrid";
import { Pagination } from "../../components/pagination/Pagination";
import { Loader } from "../../components/ui/Loader";
import { ErrorState } from "../../components/ui/ErrorState";
import { EmptyState } from "../../components/ui/EmptyState";
import { useCart } from "../../hooks/useCart";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { PRODUCTS_PER_PAGE } from "../../constants/pagination";
import { sortProducts } from "../../utils/sortProducts";
import { paginate } from "../../utils/paginate";
import type { SortOption } from "../../constants/sortOptions";
import type { Product } from "../../types/product";

interface CatalogPageProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export const CatalogPage = ({ products, isLoading, error }: CatalogPageProps) => {
  const { toggleCart, isInCart } = useCart();
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebouncedValue(searchValue, 300);

  const filteredProducts = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    if (!query) return products;

    return products.filter((product) => product.title.toLowerCase().includes(query));
  }, [products, debouncedSearch]);

  const sortedProducts = useMemo(() => sortProducts(filteredProducts, sortBy), [filteredProducts, sortBy]);
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const resolvedCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

  const currentProducts = useMemo(
    () => paginate(sortedProducts, resolvedCurrentPage, PRODUCTS_PER_PAGE),
    [resolvedCurrentPage, sortedProducts],
  );

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));

    setCurrentPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <h1 className="srOnly">AQVEX - каталог товаров для ухода за авто</h1>

        {isLoading ? (
          <div className={styles.contentState}>
            <Loader count={PRODUCTS_PER_PAGE} />
          </div>
        ) : error ? (
          <div className={styles.contentState}>
            <ErrorState message={error} />
          </div>
        ) : (
          <>
            <CatalogToolbar
              totalCount={filteredProducts.length}
              searchValue={searchValue}
              onSearchChange={handleSearchChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />

            {filteredProducts.length === 0 ? (
              <div className={styles.contentState}>
                <EmptyState message="По вашему запросу товары не найдены" />
              </div>
            ) : (
              <>
                <ProductGrid products={currentProducts} isInCart={isInCart} onToggleCart={toggleCart} />

                <Pagination
                  currentPage={resolvedCurrentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
};
