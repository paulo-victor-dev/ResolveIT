"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { getCurrentUserAction } from "@/actions/authActions";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getCurrentUser = async () => {
            const currentUser = await getCurrentUserAction()
            setUser(currentUser);
        };

        getCurrentUser();
    }, []);
    
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
