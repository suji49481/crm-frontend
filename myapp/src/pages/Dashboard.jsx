// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  // Load all customers on mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Fetch Customers from backend
  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired, please login again");
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  // Handle form input changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Add / Update Customer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/customers/${editId}`, form);
        setEditId(null);
      } else {
        await API.post("/customers", form);
      }
      setForm({ name: "", email: "", phone: "", address: "" });
      fetchCustomers();
    } catch (err) {
      alert("Error saving customer");
    }
  };

  // Edit Customer
  const handleEdit = (customer) => {
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    });
    setEditId(customer._id);
  };

  // Delete Customer
  const handleDelete = async (id) => {
    if (window.confirm("Delete this customer?")) {
      try {
        await API.delete(`/customers/${id}`);
        fetchCustomers();
      } catch (err) {
        alert("Error deleting customer");
      }
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2>Customer Dashboard</h2>

      {/* Customer Form */}
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="form-control mb-2"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="form-control mb-2"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="form-control mb-2"
          value={form.address}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">
          {editId ? "Update" : "Add"} Customer
        </button>
      </form>

      {/* Customer List */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.address}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(c)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(c._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-secondary mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
