import axios from "axios";
let url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const authApi = axios.create({
  baseURL: `${url}/auth`,
  withCredentials: true,
});

const adminApi = axios.create({
  baseURL: `${url}/admin`,
  withCredentials: true,
});

const societyHeadApi = axios.create({
  baseURL: `${url}/society-head`,
  withCredentials: true,
});

const studentApi = axios.create({
  baseURL: `${url}/student`,
  withCredentials: true,
});

export { authApi, adminApi, societyHeadApi, studentApi };
