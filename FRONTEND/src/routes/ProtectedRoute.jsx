import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/api";

const ProtectedRoute = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);

    useEffect(() => {

        const checkUser = async () => {

            try {

                const response = await api.get("/auth/profile");

                setRole(response.data.user.role);

            } catch (error) {

                // 401 = user is not logged in
                setRole(null);

            } finally {

                setLoading(false);

            }

        };

        checkUser();

    }, []);


    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-xl font-semibold text-gray-600">
                    Loading...
                </h2>
            </div>
        );

    }


    // Not logged in
    if (!role) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // Admin
    if (role === "admin") {

        return (
            <Navigate
                to="/admin/dashboard"
                replace
            />
        );

    }


    // Normal user
    if (role === "user") {

        return children;

    }


    // Unknown role
    return (
        <Navigate
            to="/login"
            replace
        />
    );

};

export default ProtectedRoute;