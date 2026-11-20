import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/api";

const AdminRoute = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        checkAdmin();
    }, []);

    const checkAdmin = async () => {

        try {

            const response = await api.get("/auth/profile");

            if (response.data.user.role === "admin") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }

        } catch (error) {

            setIsAdmin(false);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return isAdmin
        ? children
        : <Navigate to="/dashboard" replace />;
};

export default AdminRoute;