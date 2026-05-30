


import axios from "axios";

export const refreshClient = axios.create({
  baseURL: "https://socialcommerce-backend.onrender.com/api/v1/",
  withCredentials: true,
});