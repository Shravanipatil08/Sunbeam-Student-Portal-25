import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({
        token: null,
        role: null,
        user: null,
        isAuthenticated: false
    })

    const login = ({ token, role, user }) => {
        sessionStorage.setItem("token", token)
        setAuth({
            token:token,
            role:role,
            user:user,
            isAuthenticated: true
        })
    }

    const logout = () => {
        sessionStorage.clear()

        setAuth({
            token: null,
            role: null,
            user: null,
            isAuthenticated: false
        })
    }

    useEffect(()=>{
        console.log("Auth Updated:",auth)
    },[auth])

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)