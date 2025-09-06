import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="form-control mb-2" onChange={handleChange} />
        <button type="submit" className="btn btn-success">Login</button>
      </form>
      <p className="mt-2">Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
