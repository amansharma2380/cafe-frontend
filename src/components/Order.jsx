import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import "../styles/Order.css";

export default function Order() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/${user.email}`;
      const result = await axios.get(url);
      setOrders(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-container">
      <h3>My Orders</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Order Value:</strong> ₹{order.orderValue}</p>
          <p>
  <strong>Status:</strong>{" "}
  <span
    className={`status-badge ${
      order.status.toLowerCase() === "completed"
        ? "status-completed"
        : order.status.toLowerCase() === "cancelled"
        ? "status-cancelled"
        : order.status.toLowerCase() === "pending"
        ? "status-pending"
        : "status-processing"
    }`}
  >
    {order.status}
  </span>
</p>


          <table className="order-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item._id}>
                  <td data-label="Product">{item.productName}</td>
                  <td data-label="Price (₹)">{item.price}</td>
                  <td data-label="Quantity">{item.qty}</td>
                  <td data-label="Total (₹)">{item.qty * item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr className="order-divider" />
        </div>
      ))}
    </div>
  );
}
