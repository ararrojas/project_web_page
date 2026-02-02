import { useEffect, useMemo, useState } from "react";
import { listProducts } from "../api";
import "./CatalogList.css";

type Product = {
    id: number;
    name: string;
    description?: string;
    price: string | number;
    stock: number;
    image_url?: string;
    image?: string;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
};

export function CatalogList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [prevUrl, setPrevUrl] = useState<string | null>(null);

    const [search, setSearch] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized");
            return;
        }

        listProducts(token, page)
            .then((data) => {
                setProducts(data.results);
                setNextUrl(data.next);
                setPrevUrl(data.previous);
            })
            .catch((e) => setError(String(e?.message ?? e)));
    }, [page]);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return products;
        return products.filter((p) => p.name.toLowerCase().includes(q));
    }, [products, search]);

    const onAddNewProduct = () => {
        // TODO: implement patch in backend
        alert("TODO: Add New Product");
    };

    return (
        <div className="page">
            <div className="wrapper">
                <div className="row">
                    <div className="col a-right">
                        <div className="button-set">
                            <button type="button" onClick={onAddNewProduct}>
                                Add New Product
                            </button>
                        </div>
                    </div>

                    <div className="w-100" />

                    <div className="col">
                        {error && <pre style={{ color: "crimson" }}>{error}</pre>}

                        <h2 className="form-title">
                            <span>All Products</span>
                        </h2>

                        <div className="filter">
                            <div className="row">
                                <div className="col">
                                    <div className="filter">
                                        <div className="custom-select">
                                            <label>Select Category</label>
                                            <div>
                                                <select name="category" defaultValue="">
                                                    <option value="">All</option>
                                                    <option value="breakfast">Home & Garden</option>
                                                    <option value="herbal">Herbal</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="custom-select">
                                            <label>Type of Product</label>
                                            <div>
                                                <select name="type" defaultValue="">
                                                    <option value="">All</option>
                                                    <option value="tea">Tea</option>
                                                    <option value="kit">Kit</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="search-box">
                                        <label>Product Search</label>
                                        <input
                                            className="search"
                                            type="text"
                                            placeholder="Search"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="w-100" />

                                <div className="col">
                                    <span style={{ fontSize: 14, fontWeight: 600 }}>Page {page}</span>
                                    <div className="a-right" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                                        <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1 || !prevUrl}>
                                            Prev
                                        </button>
                                        <button type="button" onClick={() => { if (!nextUrl) return; setPage((p) => p + 1) }} disabled={!nextUrl}>
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <table className="table">
                            <thead>
                                <tr className="first">
                                    <th>Product Name</th>
                                    <th className="a-center">Stock</th>
                                    <th className="a-center">Price</th>
                                    <th className="a-center">Availability</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtered.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.name}</td>
                                        <td className="a-center">{p.stock}</td>
                                        <td className="a-center">€{Number(p.price).toFixed(2)}</td>
                                        <td className="a-center">{p.is_active ? "Active" : "Inactive"}</td>
                                    </tr>
                                ))}

                                {!filtered.length && (
                                    <tr>
                                        <td colSpan={6} className="a-center">
                                            No products
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}