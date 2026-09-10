import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { subscribeBackendStatus } from "../services/apiClient";

export const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const { currentUser, allUsers, setCurrentUser } = useAuth();
  const [isBackendOnline, setIsBackendOnline] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeBackendStatus((online) => {
      setIsBackendOnline(online);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <div className="status-bar">
        <div className="container status-bar-inner">
          <div className="status-indicator">
            <span className={`dot ${isBackendOnline ? "dot-green" : "dot-yellow"}`} />
            <span>
              Backend Gateway (<strong>http://localhost:8765/api</strong>):{" "}
              {isBackendOnline ? "Connected" : "Standby / Local Store"}
            </span>
          </div>
          <div>
            Active Role: <strong>{currentUser?.role || "USER"}</strong> ({currentUser?.name})
          </div>
        </div>
      </div>

      <header className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="navbar-brand">
            ShopSphere
          </Link>

          <nav>
            <ul className="navbar-links">
              <li>
                <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/orders" className={({ isActive }) => (isActive ? "active" : "")}>
                  My Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
                  Cart
                  {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/account" className={({ isActive }) => (isActive ? "active" : "")}>
                  Account
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="user-selector">
            <span>User:</span>
            <select
              value={currentUser?.id || ""}
              onChange={(e) => {
                const selected = allUsers.find((u) => u.id === Number(e.target.value));
                if (selected) setCurrentUser(selected);
              }}
            >
              {allUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.role})
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>
    </>
  );
};
