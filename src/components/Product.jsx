import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import "../styles/Product.css";

export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { cart, setCart } = useContext(AppContext);

  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [limit] = useState(8); // 4 items per row × 2 rows
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      const url = `${API_URL}/api/products/all?page=${page}&limit=${limit}`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setTotalPages(Math.ceil(result.data.total / limit));
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const addToCart = (product) => {
  const found = cart.find((item) => item._id === product._id);
  if (!found) {
    const newProduct = { ...product, qty: 1 };
    setCart([...cart, newProduct]);
  } else {
    const updatedCart = cart.map(item =>
      item._id === product._id ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updatedCart);
  }
};



  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "1rem" }}>All Products</h2>

      {error && <div className="error">{error}</div>}

      <div className="product-container">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.imgUrl} alt={product.productName} />
            <h3>{product.productName}</h3>
            <p>{product.description}</p>
            <h4>₹{product.price}</h4>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active-page" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
