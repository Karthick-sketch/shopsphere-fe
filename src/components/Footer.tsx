import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} ShopSphere. E-Commerce Platform.</p>
        <p style={{ marginTop: "4px", fontSize: "12px", color: "var(--text-light)" }}>
          Backend API services communicating via http://localhost:8765/api/&#123;service-name&#125;
        </p>
      </div>
    </footer>
  );
};
