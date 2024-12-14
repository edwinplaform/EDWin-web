import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

console.log("API:", process.env.NEXT_PUBLIC_API_URL);

export default axiosInstance;