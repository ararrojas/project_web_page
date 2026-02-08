import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/Landing";
import Sidebar from "./pages/Sidebar";
import BestSellersList from "./pages/BestSellersList";
import { Homepage } from "./pages/Homepage";
import { About } from "./pages/About";
import Overview from "./pages/Overview";
import { CatalogList } from "./pages/CatalogList";

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
      <Route element={<Sidebar onLogout={onLogout} isAuth={isAuth} />}>
        {/* Public */}
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        {/* Private */}
        <Route path="/overview" element={isAuth ? <Overview /> : <Navigate to="/login" replace />} />
        <Route path="/best_sellers" element={isAuth ? <BestSellersList /> : <Navigate to="/login" replace />} />
        <Route path="/catalog" element={isAuth ? <CatalogList /> : <Navigate to="/login" replace />} />
        <Route path="/catalog/favorites" element={isAuth ? <CatalogList favorites={true} /> : <Navigate to="/login" replace />} />
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