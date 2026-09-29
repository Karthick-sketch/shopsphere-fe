import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../auth/AuthContext";
import "./Navbar.css";

export function Navbar() {
  const { totalCount } = useCart();
  const { authUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  const initials = authUser
    ? authUser.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
    : "";

  return (
    <header className="navbar">
      <div className="page navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__mark" aria-hidden="true" />
          ShopSphere
        </NavLink>

        <nav className="navbar__links">
          <NavLink to="/" end className="navbar__link">
            Shop
          </NavLink>
          <NavLink to="/orders" className="navbar__link">
            Orders
          </NavLink>
        </nav>

        <div className="navbar__user">
          <NavLink to="/cart" className="navbar__cart">
            <span>Cart</span>
            <span className="navbar__cart-count">{totalCount}</span>
          </NavLink>

          {authUser ? (
            <>
              <span className="navbar__avatar" aria-hidden="true">
                {initials}
              </span>
              <span className="navbar__user-name">{authUser.name}</span>
              <button
                id="navbar-logout"
                className="navbar__auth-btn"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </>
          ) : (
            <Link to="/login" id="navbar-signin" className="navbar__auth-btn">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
