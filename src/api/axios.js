import axios from 'axios';

const API = axios.create({
    // Using a relative path so the Vite proxy can handle CORS issues
    baseURL: '/api',
});

// Request interceptor for adding the bearer token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor for handling errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        
        const isAuthEndpoint = error.config?.url?.includes('/auth/login') || error.config?.url?.includes('/auth/register');
        
        if (status === 401 && !isAuthEndpoint) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default API;
