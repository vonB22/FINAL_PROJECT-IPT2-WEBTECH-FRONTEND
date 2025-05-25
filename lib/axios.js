// lib/axios.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // Set to false unless you use Sanctum/session
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
