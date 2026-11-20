import axios from "axios";

const api = axios.create({
    baseURL: "https://ecowaste-backend-5kkh.onrender.com/api",
    withCredentials: true,
    timeout: 10000,
});

export default api;