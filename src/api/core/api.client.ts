

import axios from "axios";
import { setupInterceptors } from "./api.interceptor";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

setupInterceptors(apiClient);

export default apiClient;








// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://api.yourapp.com",
//   withCredentials: true,
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken"); // TEMP SAFE LAYER
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;