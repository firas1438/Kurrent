import axios from "axios";
import { attachAuthInterceptor } from "./interceptor";

const baseURL = "http://localhost:5000";
console.log('Using API URL:', baseURL);

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

attachAuthInterceptor(api);

export default api;