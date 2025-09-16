import axios from "axios";

const api = axios.create({
 baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: true // <-- important for sending cookies
});

export default api;
