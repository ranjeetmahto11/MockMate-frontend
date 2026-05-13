import axios from 'axios';

const API = axios.create({
    // Using a relative path so the Vite proxy can handle CORS issues
    baseURL: `${import.meta.env.VITE_API_URL}/api` || 'https://ai-mock-interview-73qo.onrender.com/api',
    withCredentials: true,
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
        const url = error.config?.url;
        
        console.error(`API Error [${status}]:`, url, error.response?.data);
        
        const isAuthEndpoint = url?.includes('/auth/login') || url?.includes('/auth/register');
        
        if (status === 401 && !isAuthEndpoint) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        
        // Handle CORS or network errors
        if (status === 403 || !error.response) {
            console.error('CORS/Network Error: Backend API may be down or blocking requests');
        }
        
        return Promise.reject(error);
    }
);

export default API;
