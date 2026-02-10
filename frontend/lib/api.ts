import axios from "axios";
import { attachAuthInterceptor } from "./interceptor";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

attachAuthInterceptor(api);

export default api;