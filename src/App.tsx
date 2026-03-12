import { Route, Routes } from "react-router-dom";
import { CatalogPage } from "./pages/catalog/CatalogPage";
import { CartPage } from "./pages/cart/CartPage";
import { NotFoundPage } from "./pages/404/NotFoundPage";
import { useProducts } from "./hooks/useProducts";

function App() {
  const { products, isLoading, error } = useProducts();

  return (
    <Routes>
      <Route path="/" element={<CatalogPage products={products} isLoading={isLoading} error={error} />} />
      <Route path="/cart" element={<CartPage products={products} isLoading={isLoading} error={error} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
