import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      error.response?.data?.error || "Terjadi error pada server"
    );
  }
);

export default api;
