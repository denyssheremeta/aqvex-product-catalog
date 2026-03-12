import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { NotFoundPage } from "./pages/404/NotFoundPage";
import { CartPage } from "./pages/cart/CartPage";
import { CatalogPage } from "./pages/catalog/CatalogPage";
import { ProductPage } from "./pages/product/ProductPage";
import { useProducts } from "./hooks/useProducts";

function App() {
  const { products, isLoading, error } = useProducts();

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<CatalogPage products={products} isLoading={isLoading} error={error} />} />
        <Route path="/cart" element={<CartPage products={products} isLoading={isLoading} error={error} />} />
        <Route
          path="/products/:slug"
          element={<ProductPage products={products} isLoading={isLoading} error={error} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
