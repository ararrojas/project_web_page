import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ProductsList from "./pages/ProductsList";
import { Homepage } from "./pages/Homepage";
import { About } from "./pages/About";

type Props = { onLogout: () => void; isAuth: boolean };

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
      <Route path="/login" element={<LandingPage onAuthSuccess={onAuthSuccess} />} />
      <Route element={<Dashboard onLogout={onLogout} isAuth={isAuth} />}>
        {/* Public (siempre accesibles) */}
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />

        {/* Private (requieren auth) */}
        <Route path="/products" element={isAuth ? <ProductsList /> : <Navigate to="/login" replace />} />
        <Route path="/orders" element={isAuth ? <div style={{ padding: 24 }}>Orders (TODO)</div> : <Navigate to="/login" replace />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
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