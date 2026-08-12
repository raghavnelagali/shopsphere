import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function AdminRoute() {

    const {
        user,
        isAuthenticated,
    } = useAuth();


    // ==========================================
    // NOT LOGGED IN
    // ==========================================

    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // ==========================================
    // LOGGED IN BUT NOT ADMIN
    // ==========================================

    if (user?.role !== "admin") {

        return (
            <Navigate
                to="/"
                replace
            />
        );

    }


    // ==========================================
    // ADMIN
    // ==========================================

    return <Outlet />;

}


export default AdminRoute;