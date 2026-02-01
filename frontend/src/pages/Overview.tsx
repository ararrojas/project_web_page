import { useEffect, useState } from "react";
import { getStats } from "../api";

export default function Overview() {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No hay token. Inicia sesión.");
      return;
    }

    getStats(token)
      .then(setStats)
      .catch((e) => setError(String(e?.message ?? e)));
  }, []);

  return (
    <div>
      <h1>Overview</h1>
      {error && <pre style={{ color: "crimson" }}>{error}</pre>}
      {stats && <pre>{JSON.stringify(stats, null, 2)}</pre>}
    </div>
  );
}