import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content minimal">
        <h4>Thank you for visiting ShopEase</h4>
        <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
      </div>
    </footer>
  );
}
