import { Link } from "react-router-dom";

const FOOTER_COLS = [
  {
    title: "Get to Know Us",
    links: ["About ShopSphere", "Careers", "Press Releases", "ShopSphere Cares", "Gift a Smile"],
  },
  {
    title: "Connect with Us",
    links: ["Facebook", "Twitter", "Instagram"],
  },
  {
    title: "Make Money with Us",
    links: ["Sell on ShopSphere", "Become an Affiliate", "Advertise Your Products", "ShopSphere Pay on Merchants"],
  },
  {
    title: "Let Us Help You",
    links: ["COVID-19 and ShopSphere", "Your Account", "Returns Centre", "100% Purchase Protection", "Help"],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <p className="footer-col-title">{col.title}</p>
              {col.links.map((l) => (
                <Link key={l} to="#" className="footer-link">{l}</Link>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span className="footer-bottom-logo">🛍️ ShopSphere</span>
          <span className="footer-bottom-text">© 2026 ShopSphere, Inc. or its affiliates</span>
          <div style={{ display: "flex", gap: 16 }}>
            <Link to="#" className="footer-link" style={{ fontSize: 12 }}>Privacy</Link>
            <Link to="#" className="footer-link" style={{ fontSize: 12 }}>Terms</Link>
            <Link to="#" className="footer-link" style={{ fontSize: 12 }}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
