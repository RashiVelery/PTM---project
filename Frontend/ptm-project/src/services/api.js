import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4004/api",
  withCredentials: true, // 🔥 required for cookies
});

export default API;
