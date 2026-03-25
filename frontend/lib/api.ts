import axios from "axios";
import { attachAuthInterceptor } from "./interceptor";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

if (process.env.NODE_ENV !== "production") {
  console.log('Using API URL:', baseURL);
}

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

attachAuthInterceptor(api);

export default api;