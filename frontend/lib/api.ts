import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // IMPORTANT for HttpOnly cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
