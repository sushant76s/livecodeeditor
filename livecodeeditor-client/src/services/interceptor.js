import axios from "axios";
import { SERVER_BASE_URL } from "../config-global";

const Interceptor = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

Interceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Interceptor.interceptors.response.use((res) => res);

export default Interceptor;
