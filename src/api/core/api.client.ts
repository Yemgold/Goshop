

import axios from "axios";
import { setupInterceptors } from "./api.interceptor";

export const apiClient = axios.create({
  baseURL: "https://socialcommerce-backend.onrender.com/api/v1/",
  withCredentials: true,
});

setupInterceptors(apiClient);

export default apiClient;




