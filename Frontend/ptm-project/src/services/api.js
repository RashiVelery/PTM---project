import axios from "axios";

const API = axios.create({
  baseURL: "https://ptm-projectbackend.vercel.app/api",
  withCredentials: true, // 🔥 required for cookies
});

export default API;
