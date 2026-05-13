import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser]       = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = () => {
            const savedUser  = localStorage.getItem('user');
            const savedToken = localStorage.getItem('token');
            if (savedUser && savedToken) {
                try {
                    setUser(JSON.parse(savedUser));
                } catch (e) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const register = async (data) => {
        try {
            const res = await API.post('/api/auth/register', data);
            
            // Log for debugging
            console.log("Register Response:", res.data);

            const token = res.data.token;
            const userData = res.data.user || res.data;
            
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user',  JSON.stringify(userData));
                setUser(userData);
                toast.success('Identity Created Successfully');
                return true;
            }
            return false;
        } catch (err) {
            console.error("Register API Error:", err.response?.data);
            const msg = err.response?.data?.message || err.response?.data?.error || 'Authorization Failed';
            toast.error(msg);
            return false;
        }
    };

    const login = async (data) => {
        try {
            const res = await API.post('/api/auth/login', data);
            
            // Log for debugging
            console.log("Login Response:", res.data);

            const token = res.data.token;
            const userData = res.data.user || res.data;
            
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user',  JSON.stringify(userData));
                setUser(userData);
                toast.success('Neural Link Established');
                return true;
            }
            return false;
        } catch (err) {
            console.error("Login API Error:", err.response?.data);
            const msg = err.response?.data?.message || err.response?.data?.error || 'Invalid Credentials';
            toast.error(msg);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        toast.success('Session Terminated');
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};