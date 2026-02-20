import axios from "axios";

const API = axios.create({
  baseURL: "https://ptm-project.onrender.com/",
  withCredentials: true, // 🔥 required for cookies
});

export default API;
