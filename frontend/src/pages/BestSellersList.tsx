import { useEffect, useState } from "react";
import { listBestSellers } from "../api";
import ProductCarousel from "../components/ProductCarousel";

export default function BestSellersList() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized");
      return;
    }

    listBestSellers(token)
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