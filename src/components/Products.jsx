import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// import "../styles/Products.css";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    imgUrl: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/products/${id}`);
      setError("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      await axios.post(`${API_URL}/api/products`, form);
      setError("Product added successfully");
      fetchProducts();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      productName: product.productName,
      description: product.description,
      price: product.price,
      imgUrl: product.imgUrl,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      await axios.patch(`${API_URL}/api/products/${editId}`, form);
      fetchProducts();
      setEditId();
      resetForm();
      setError("Product updated successfully");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      productName: "",
      description: "",
      price: "",
      imgUrl: "",
    });
  };

  return (
    <div className="product-container">
      <div className="form-section">
        <h2>{editId ? "Edit Product" : "Add Product"}</h2>
        {error && <p>{error}</p>}
        <form ref={frmRef}>
          <input
            name="productName"
            value={form.productName}
            type="text"
            placeholder="Product Name"
            onChange={handleChange}
            required
          />
          <input
            name="description"
            value={form.description}
            type="text"
            placeholder="Description"
            onChange={handleChange}
            required
          />
          <input
            name="price"
            value={form.price}
            type="text"
            placeholder="Price"
            onChange={handleChange}
            required
          />
          <input
            name="imgUrl"
            value={form.imgUrl}
            type="text"
            placeholder="Image URL"
            onChange={handleChange}
            required
          />
          {editId ? (
            <>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleCancel} type="button">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={handleAdd}>Add</button>
          )}
        </form>
      </div>

      <div className="product-list-section">
        <h2>Product List</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name"
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button onClick={fetchProducts}>Search</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((value, index) => (
              <tr key={value._id} style={{ animationDelay: `${index * 0.1}s` }}>
                <td>{value.productName}</td>
                <td>{value.description}</td>
                <td>{value.price}</td>
                <td>
                  <a href={value.imgUrl} target="_blank" rel="noreferrer">
                    View
                  </a>
                </td>
                <td>
                  <button className="edit" onClick={() => handleEdit(value)}>Edit</button>
                  <button className="dlt" onClick={() => handleDelete(value._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          Page {page} of {totalPages}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
