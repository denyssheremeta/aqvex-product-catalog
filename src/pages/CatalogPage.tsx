import { useEffect, useMemo, useState } from "react";
import styles from "./CatalogPage.module.css";
import { Header } from "../components/header/Header";
import { CatalogToolbar } from "../components/catalog-toolbar/CatalogToolbar";
import { ProductGrid } from "../components/product-grid/ProductGrid";
import { Pagination } from "../components/pagination/Pagination";
import { Footer } from "../components/footer/Footer";
import { Toast } from "../components/toast/Toast";
import { Loader } from "../components/ui/Loader";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";
import { useProducts } from "../hooks/useProducts";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { PRODUCTS_PER_PAGE } from "../constants/pagination";
import { sortProducts } from "../utils/sortProducts";
import { paginate } from "../utils/paginate";
import type { SortOption } from "../constants/sortOptions";
import type { Product } from "../types/product";

export const CatalogPage = () => {
  const { products, isLoading, error } = useProducts();

  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const [addedProductIds, setAddedProductIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);

  const debouncedSearch = useDebouncedValue(searchValue, 300);

  const filteredProducts = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    if (!query) return products;

    return products.filter((product) => product.title.toLowerCase().includes(query));
  }, [products, debouncedSearch]);

  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortBy);
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  const currentProducts = useMemo(() => {
    return paginate(sortedProducts, currentPage, PRODUCTS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [debouncedSearch, sortBy]);

  useEffect(() => {
    if (!isToastVisible) return;

    const timeoutId = window.setTimeout(() => {
      setIsToastVisible(false);
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [isToastVisible]);

  const handleAddToCart = (product: Product) => {
    setAddedProductIds((prev) => {
      if (prev.includes(product.id)) {
        return prev;
      }

      return [...prev, product.id];
    });

    setToastMessage(`Товар "${product.title}" добавлен в корзину`);
    setIsToastVisible(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <>
      <Header />

      <main className={styles.page}>
        <div className="container">
          <CatalogToolbar
            totalCount={filteredProducts.length}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {filteredProducts.length === 0 ? (
            <EmptyState message="По вашему запросу товары не найдены" />
          ) : (
            <>
              <ProductGrid products={currentProducts} addedProductIds={addedProductIds} onAddToCart={handleAddToCart} />

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </>
          )}
        </div>
      </main>

      <Footer />

      <Toast message={toastMessage} isVisible={isToastVisible} />
    </>
  );
};
