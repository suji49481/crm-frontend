import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      alert("Registration successful. Please login.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error registering");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" className="form-control mb-2" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="form-control mb-2" onChange={handleChange} />
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <p className="mt-2">Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
};

export default Register;
