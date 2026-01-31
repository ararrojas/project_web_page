import { useEffect, useState } from "react";
import { listProducts } from "../api";

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
        <h2>Products</h2>
        {error && <pre>{error}</pre>}
        <ul>
          {products.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      </div>
    );
  }