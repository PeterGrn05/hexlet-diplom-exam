import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext(null); // важно: начальное значение null

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/users/check/');
                if (response.data.is_admin) {
                    setIsAdmin(true);
                    setUser({ username: response.data.username });
                }
            } catch (err) {
                // 401 - просто не авторизован, не выводим ошибку в консоль
                console.debug('Not authenticated');
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (loginValue, passwordValue) => {
        try {
            const response = await axios.post('/users/login/', {
                login: loginValue,
                password: passwordValue,
            });
            if (response.data.success) {
                setIsAdmin(true);
                setUser(response.data.user);
                return { success: true };
            } else {
                return { success: false, error: response.data.error };
            }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Ошибка соединения',
            };
        }
    };

    const logout = async () => {
        try {
            await axios.post('/users/logout/');
        } catch (err) {
            console.error('Logout error', err);
        } finally {
            setIsAdmin(false);
            setUser(null);
        }
    };

    const value = { user, isAdmin, loading, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};