import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

export function Navbar() {
  const { totalCount } = useCart();

  return (
    <header className="navbar">
      <div className="page navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__mark" aria-hidden="true" />
          Brewline
        </NavLink>

        <nav className="navbar__links">
          <NavLink to="/" end className="navbar__link">
            Shop
          </NavLink>
          <NavLink to="/orders" className="navbar__link">
            Orders
          </NavLink>
        </nav>

        <NavLink to="/cart" className="navbar__cart">
          <span>Cart</span>
          <span className="navbar__cart-count">{totalCount}</span>
        </NavLink>
      </div>
    </header>
  );
}
