// authProvider.tsx

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../domain/entities/auth';

interface AuthContextType {
    user: User | null;
    userToken: string | null;
    login: (token: string, user: User) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                const userData = await AsyncStorage.getItem('user');
                if (token) {
                    setUserToken(token);
                }
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            } catch (error) {
                console.error("Error al cargar el token o el usuario: ", error);
            }
        };
        loadToken();
    }, []);

    const login = async (token: string, user: User) => {
        try {
            await AsyncStorage.setItem('authToken', token);
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setUserToken(token);
            setUser(user);
        } catch (error) {
            console.error("Error al almacenar el token o el usuario: ", error);
        }
    };
    

    const logout = async () => {
        setUserToken(null);
        setUser(null);
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ userToken, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
