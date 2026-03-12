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

const CART_STORAGE_KEY = "product-catalog-cart";

const getInitialCartState = (): string[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter((value): value is string => typeof value === "string");
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const CatalogPage = () => {
  const { products, isLoading, error } = useProducts();

  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const [addedProductIds, setAddedProductIds] = useState<string[]>(getInitialCartState);
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
    if (!isToastVisible) return;

    const timeoutId = window.setTimeout(() => {
      setIsToastVisible(false);
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [isToastVisible, toastMessage]);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(addedProductIds));
  }, [addedProductIds]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleToggleCart = (product: Product) => {
    const isAlreadyAdded = addedProductIds.includes(product.id);

    setAddedProductIds((prev) =>
      isAlreadyAdded ? prev.filter((productId) => productId !== product.id) : [...prev, product.id],
    );
    setToastMessage(
      isAlreadyAdded ? `Товар "${product.title}" удален из корзины` : `Товар "${product.title}" добавлен в корзину`,
    );
    setIsToastVisible(true);
  };

  return (
    <>
      <Header />

      <main className={styles.page}>
        <div className="container">
          <h1 className="srOnly">Каталог товаров для ухода за авто</h1>

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
                  <ProductGrid
                    products={currentProducts}
                    addedProductIds={addedProductIds}
                    onToggleCart={handleToggleCart}
                  />

                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />

      <Toast message={toastMessage} isVisible={isToastVisible} />
    </>
  );
};
