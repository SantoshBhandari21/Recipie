import axios from "axios";

export const apiRequest = axios.create({
  baseURL: "https://recipie-backend-wvpo.onrender.com/api",
  withCredentials: true,
});
