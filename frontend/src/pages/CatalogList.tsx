import { useEffect, useMemo, useState } from "react";
import { listProducts, updateProduct } from "../api";
import "./CatalogList.css";

type Product = {
    id: number;
    name: string;
    description?: string;
    category: string;
    price: string | number;
    stock: number;
    image_url?: string;
    image?: string;
    is_active: boolean;
    is_favorite: boolean;
    created_at?: string;
    updated_at?: string;
};

export function CatalogList({ favorites = false }: { favorites?: boolean }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [prevUrl, setPrevUrl] = useState<string | null>(null);
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized");
            return;
        }

        listProducts(token, page, category)
            .then((data) => {
                setProducts(data.results);
                console.log("first product:", data.results?.[0]);
                setNextUrl(data.next);
                setPrevUrl(data.previous);
            })
            .catch((e) => setError(String(e?.message ?? e)));
    }, [page, category]);

    const onUpdateProduct = (productId: number, data: any) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized");
            return;
        }
        updateProduct(token, productId, data)
            .then((product_updated) => {
                setProducts((prev) => prev.map((p) => (p.id === product_updated.id ? product_updated : p)));
            })
            .catch((e) => setError(String(e?.message ?? e)));
    };

    const allProducts = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return products;
        return products.filter((p) => {
            const matcbSearch = !q || p.name.toLowerCase().includes(q);
            const matchCategory = !category || p.category === category;
            return matcbSearch && matchCategory
        });
    }, [products, search, category]);
    
    const filteredProducts = favorites ? allProducts.filter((p) => p.is_favorite) : allProducts;

    const onAddNewProduct = () => {
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
                        <div className="filter">
                            <div className="row">
                                <div className="col">
                                    <div className="filter">
                                        <div className="custom-select">
                                            <label>Select Category</label>
                                            <div>
                                            <select value={category} onChange={(e) => {setCategory(e.target.value); setPage(1)}} name="category">
                                                    <option value="">All</option>
                                                    <option value="herbal">herbal</option>
                                                    <option value="kit">kit</option>
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
                                    <th>Description</th>
                                    <th className="a-center">Category</th>
                                    <th className="a-center">Stock</th>
                                    <th className="a-center">Price</th>
                                    <th className="a-center">Availability</th>
                                    <th className="a-center">Mark as Favorite</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredProducts.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.name}</td>
                                        <td className="description">{p.description}</td>
                                        <td className="a-center">{p.category}</td>
                                        <td className="a-center">{p.stock}</td>
                                        <td className="a-center">€{Number(p.price).toFixed(2)}</td>
                                        <td className="a-center">{p.is_active ? "Active" : "Inactive"}</td>
                                        <td className="a-center">
                                        <button
                                            type="button" className="fav-button"
                                            onClick={() => onUpdateProduct(p.id, { is_favorite: !p.is_favorite })}
                                        ><i className={p.is_favorite ? "ri-heart-fill" : "ri-heart-line"} /></button>
                                        </td>
                                    </tr>
                                ))}

                                {!allProducts.length && (
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