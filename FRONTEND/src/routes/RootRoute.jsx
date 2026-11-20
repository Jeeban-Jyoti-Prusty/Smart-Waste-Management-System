import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/api";
import Home from "../pages/Home";

const RootRoute = () => {

    const [role, setRole] = useState(null);
    const [checked, setChecked] = useState(false);

    useEffect(() => {

        const checkLogin = async () => {

            try {

                const response = await api.get("/auth/status");

                console.log("Auth Status:", response.data);

                if (
                    response.data.isAuthenticated &&
                    response.data.user
                ) {
                    setRole(response.data.user.role);
                }

            } catch (error) {

                // Backend OFF / not logged in
                console.log("Backend unavailable or user not logged in");

                setRole(null);

            } finally {

                setChecked(true);

            }

        };

        checkLogin();

    }, []);


    // Admin
    if (checked && role === "admin") {
        return (
            <Navigate
                to="/admin/dashboard"
                replace
            />
        );
    }


    // User
    if (checked && role === "user") {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }


    // Not logged in / backend unavailable
    return <Home />;

};

export default RootRoute;