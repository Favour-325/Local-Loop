import {  createContext, useContext, useState, useEffect  } from 'react';
import { api_authenticate, api_login, api_logout, api_refreshToken } from './api';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await api_authenticate();
            setUser(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                try {
                    await api_refreshToken();
                    const retryResponse = await api_authenticate();
                    setUser(retryResponse.data);
                } catch (error) {
                    setUser(null)
                }
            } else {
                setUser(null)
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (credentials) => {
        try {
            await api_login(credentials);
            await checkAuth();
        } catch (error) {
            console.error("Login Failed", error.response?.data || error.message);
        }
    }

    const logout = async () => {
        try {
            await api_logout();
            setUser(null)
        } catch (error) {
            console.error("Logout Failed", error.response?.data || error.message);
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}