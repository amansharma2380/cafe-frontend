// AdminLayout.jsx

import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import "../styles/Admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-container">
      {/* Admin Navbar */}
      <div className="admin-navbar">
        <div className="nav-spacer" /> {/* pushes nav items to right */}
        <div className="nav-links">
          <Link to="/admin">Users</Link>
          <span>-</span>
          <Link to="/admin/products">Products</Link>
          <span>-</span>
          <Link to="/admin/orders">Orders</Link>
        </div>
      </div>

      {/* Outlet */}
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
