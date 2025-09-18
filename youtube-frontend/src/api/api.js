import axios from "axios";

// Created an Axios instance with a base URL and credentials included
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  withCredentials: true, 
});

export default api;
