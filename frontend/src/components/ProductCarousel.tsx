import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import "./ProductCarousel.css";

export default function ProductCarousel({ products }: { products: any[] }) {
  const items = useMemo(() => products.slice(0, 4), [products]);
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setIdx((i) => (i + 1) % items.length);

  if (!items.length) return null;

  return (
    <div className="carousel">
      <div className="carousel-header">
        <button type="button" onClick={prev} className="carousel-btn">
          Prev
        </button>
        <div className="carousel-dots">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`dot ${i === idx ? "active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button type="button" onClick={next} className="carousel-btn">
          Next
        </button>
      </div>

      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {items.map((p, i) => (
            <div className="carousel-slide" key={p.id ?? i}>
              <ProductCard product={p}
              imageSrc={`/product/Product${p.id}.jpeg`}
            />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}