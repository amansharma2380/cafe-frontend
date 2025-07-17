import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import App, { AppContext } from "../App";
import "../styles/Header.css";
export default function Header() {
  const { user, cart } = useContext(AppContext);
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="navbar">
      <h1>MERN Frontend</h1>
      <Link to="/">Home</Link><Link to="/cart">MyCart
       {totalItems > 0 && <span className="cart-count"> ({totalItems})</span>}</Link>
      <Link to="/order">MyOrder</Link>

      {/* <Link to="/admin">Admin</Link> */}

      {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      
      {user?.token ? <Link to="/profile">Profile</Link> : <Link to="/login">Login</Link> }


    </div>
  );
}