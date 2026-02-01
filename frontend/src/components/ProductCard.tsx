import "./ProductCard.css";
export default function ProductCard({ product, imageSrc }: { product: any, imageSrc: string }) {
    return (
        <div className="card-container">
            <div className="card-grid">
                <div className="img">
                    <img className="product-image" src={imageSrc} alt={product?.name} />
                </div>

                <div className="card-content">
                    <h2 className="pro-name">{product?.name}</h2>
                    <p className="pro-des">
                        {product?.description}
                    </p>

                    <div className="price">
                        <p className="current-price">€{product?.price}</p>
                        <p className="old-price">€{(Number(product?.price) + 30).toFixed(2)}</p>
                    </div>

                    <button className="cta" type="button">
                        <i className="ri-shopping-cart-fill" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}