import {
    createContext,
    useContext,
    useState,
} from "react";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    // ==========================================
    // GET STORED USER
    // ==========================================

    const storedUser =
        localStorage.getItem("user");


    const [user, setUser] =
        useState(
            storedUser
                ? JSON.parse(storedUser)
                : null
        );


    const [isAuthenticated, setIsAuthenticated] =
        useState(
            !!localStorage.getItem("accessToken")
        );


    // ==========================================
    // LOGIN
    // ==========================================

    const login = (userData, token) => {

        localStorage.setItem(
            "accessToken",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );


        setUser(userData);

        setIsAuthenticated(true);

    };


    // ==========================================
    // LOGOUT
    // ==========================================

    const logout = () => {

        localStorage.removeItem(
            "accessToken"
        );

        localStorage.removeItem(
            "user"
        );


        setUser(null);

        setIsAuthenticated(false);

    };


    return (

        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};


export const useAuth = () => {

    return useContext(AuthContext);

};