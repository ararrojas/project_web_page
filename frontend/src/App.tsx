import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/Landing";
import { DashboardLayout } from "./pages/Dashboard";
import ProductsList from "./pages/ProductsList";
import { Homepage } from "./pages/Homepage";


function AppRoutes() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const isAuth = Boolean(token);

  const onLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const onAuthSuccess = (t: string) => {
    localStorage.setItem("token", t);
    setToken(t);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={isAuth ? <Navigate to="/homepage" replace /> : <LandingPage onAuthSuccess={onAuthSuccess} />}
      />

      <Route
        path="/homepage"
        element={isAuth ? <DashboardLayout onLogout={onLogout} /> : <Navigate to="/" replace />}
      >
        <Route index element={<Homepage onLogout={onLogout} />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="orders" element={<div style={{ padding: 24 }}>Orders (TODO)</div>} />
      </Route>

      <Route path="*" element={<Navigate to={isAuth ? "/homepage" : "/"} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}