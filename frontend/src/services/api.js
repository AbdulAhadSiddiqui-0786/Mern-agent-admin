import axios from "axios";
// Axios instance for centralized HTTP request configuration.

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  // Use environment-specific API base URL, fallback to localhost in development.
});

// Attach auth token to every request if available
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default api;
// Export the configured instance for reuse across the app.
