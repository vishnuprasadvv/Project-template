import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Define the User type
interface User {
    id: string, 
    email: string, 
    name: string, 
    role: 'admin' | 'user'
}

// Define the shape of the AuthContext 
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (email: string, password: string, name: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on initial render
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if(storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Failed to parse user from localStorage:', error);
            localStorage.removeItem('user'); // Clear corrupted data
        }finally{
            setLoading(false);
        }
    },[]);

    // Simulate login 
    const login = async (email: string, password: string): Promise<boolean> => {
        setLoading(true);
        // Api call here
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

        if (email === 'admin@example.com' && password === 'password123') {
            const newUser: User = {id: '1', email, name: 'Admin User', role: 'admin' };
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            setLoading(false);
            return true;
        } else if (email === 'user@example.com' && password=== 'password123') {
            const newUser: User = { id: '2', email, name: 'Regular User', role: 'user' };
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            return true;
        } else {
            setLoading(false);
            return false; // Authentication failed;
        }
    };

    // Simulate signup 
    const signup = async (email: string, name: string, password: string): Promise<boolean> => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

        if( email === 'admin@example.com' || email === 'user@example.com') {
            setLoading(false);
            return false; // user already exists
        }
        const newUser: User = { id: crypto.randomUUID(), email, name, role: 'user' };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        setLoading(false);
        return true;
    };

    // Simulate logout
    const logout =() => {
        setLoading(true);
        setUser(null);
        localStorage.removeItem('user');
        setLoading(false);
    };

    const isAuthenticated = !user ? false : true;
    
    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, signup, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}