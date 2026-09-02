import axios from "axios";

// We have to make this dynamic since there isn't "localhost" in production
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const api = axios.create({
    baseURL: BASE_URL
});

export default api;
