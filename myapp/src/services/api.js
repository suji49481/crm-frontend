// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-1-9996.onrender.com", // your backend URL
});

// Attach token from localStorage if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
