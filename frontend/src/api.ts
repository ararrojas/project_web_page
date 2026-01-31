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

export async function listProducts(token: string) {
  const res = await fetch(`${BASE_URL}/api/products/`, {
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