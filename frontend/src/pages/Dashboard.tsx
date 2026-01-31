import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import "./Homepage.css";

type Props = { onLogout: () => void };

export const DashboardLayout: React.FC<Props> = ({ onLogout }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const toggleMenu = (key: string) =>
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className={`layout has-sidebar ${isToggled ? "toggled" : ""} fixed-sidebar fixed-header`}>
      <aside id="sidebar" className="sidebar break-point-sm has-bg-image">
        <div className="sidebar-layout">
          <div className="sidebar-header">
            <div className="leaf-logo">
              <div>
                <i className="ri-leaf-line" />
              </div>
              <h4 className="brand-title">BackToSoil</h4>
            </div>
          </div>

          <div className="sidebar-content">
            <nav className="menu open-current-submenu">
              <ul>
                <li className="menu-header">
                  <span> GENERAL </span>
                </li>

                <li className="menu-item sub-menu">
                  <Link to="/homepage" onClick={() => setOpenMenus((prev) => ({ ...prev, products: false }))}>
                    <span className="menu-icon">
                      <i className="ri-home-9-line"></i>
                    </span>
                    <span className="menu-title">Home</span>
                  </Link>
                </li>

                <li className={`menu-item sub-menu ${openMenus.products ? "open" : ""}`}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu("products");
                    }}
                  >
                    <span className="menu-icon">
                      <i className="ri-shopping-cart-fill"></i>
                    </span>
                    <span className="menu-title">Products</span>
                    <span className="menu-suffix">
                      <span className="badge primary">Hot</span>
                    </span>
                  </a>

                  <div className="sub-menu-list">
                    <ul>
                      <li className="menu-item">
                        <Link to="/homepage/products">
                          <span className="menu-title">Catalog</span>
                        </Link>
                      </li>

                      <li className="menu-item">
                        <Link to="/homepage/orders">
                          <span className="menu-title">Orders</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>

          <div className="sidebar-footer">
            <button type="button" className="logout-btn" onClick={onLogout}>
              <i className="ri-logout-box-r-line" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Contenido que cambia por ruta */}
      <main style={{ width: "100%" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;