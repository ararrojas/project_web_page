const BASE_URL = "http://127.0.0.1:8000";

export async function signup(name: string, email: string, password: string) {
    const res = await fetch(`${BASE_URL}/api/signup/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
  
    const data = await res.json().catch(() => ({}));
  
    if (!res.ok) throw new Error(JSON.stringify(data));
    return data;
  }

export async function login(email: string, password: string) {
    const res = await fetch(`${BASE_URL}/api/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(JSON.stringify(data));
    return data;
  }

export async function listBestSellers(token: string) {
  const res = await fetch(`${BASE_URL}/api/products/best_sellers/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  const data = await res.json().catch(() => ({}));
  console.log(data);
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}

export async function listProducts(token: string, page: number = 1, category?: string) {
  const url = new URL(`${BASE_URL}/api/products/`);
  url.searchParams.set("page", String(page));
  if (category) url.searchParams.set("category", category);
  
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}

export async function updateProduct(token: string, productId: number, data: any) {
  const res = await fetch(`${BASE_URL}/api/products/${productId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
  const product_updated = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(JSON.stringify(product_updated));
  return product_updated;
}


export async function getStats(token: string) {
  const res = await fetch(`${BASE_URL}/api/products/stats/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  const data = await res.json().catch(() => ({}));
  console.log(data);
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}