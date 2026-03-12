import { useEffect, useState } from "react";
import { CatalogPage } from "./pages/CatalogPage";
import { CartPage } from "./pages/CartPage";
import { useProducts } from "./hooks/useProducts";

const getCurrentRoute = () => {
  return window.location.hash === "#/cart" ? "cart" : "catalog";
};

function App() {
  const { products, isLoading, error } = useProducts();
  const [route, setRoute] = useState(getCurrentRoute);

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = "#/";
    }

    const handleHashChange = () => {
      setRoute(getCurrentRoute());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return route === "cart" ? (
    <CartPage products={products} isLoading={isLoading} error={error} />
  ) : (
    <CatalogPage products={products} isLoading={isLoading} error={error} />
  );
}

export default App;
