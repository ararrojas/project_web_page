import { useEffect, useState } from "react";
import { listProducts } from "../api";
import ProductCarousel from "../components/ProductCarousel";

export default function ProductsList() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No hay token. Inicia sesión.");
      return;
    }

    listProducts(token)
      .then(setProducts)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div>
      {error && <pre>{error}</pre>}
      <ProductCarousel products={products} />
    </div>
  );
}