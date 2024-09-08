import axios from 'axios';
import { getCookie } from 'cookies-next';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

api.interceptors.request.use(
    (config) => {
        const token = getCookie('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
