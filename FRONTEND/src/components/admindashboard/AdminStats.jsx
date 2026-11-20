import React, { useEffect, useState } from "react";
import AdminStatusCard from "./AdminStatusCard";

import {
    FileText,
    Clock3,
    RefreshCcw,
    CheckCircle,
} from "lucide-react";

import api from "../../api/api";

const AdminStats = () => {

    const [stats, setStats] = useState({
        totalReports: 0,
        pendingReports: 0,
        inProgressReports: 0,
        resolvedReports: 0,
    });

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getAdminProfile = async () => {

        try {

            const response = await api.get("/auth/profile");

            console.log("Admin Profile:", response.data);

            setUser(response.data.user);

        } catch (error) {

            console.log(
                error.response?.data?.message || error.message
            );

        }

    };

    const getAdminStats = async () => {

        try {

            const response = await api.get(
                "/report/dashboard-stats"
            );

            console.log(response.data);

            setStats(response.data.stats);

        } catch (error) {

            console.log(
                error.response?.data?.message || error.message
            );

            setError(
                error.response?.data?.message ||
                "Failed to load dashboard statistics"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        getAdminStats();
        getAdminProfile();

    }, []);

    return (

        <div>

            {/* Heading */}

            <h1 className="text-2xl sm:text-3xl font-bold">
                Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
                Welcome back, {user?.fullName || "Admin"}!
            </p>


            {/* Error */}

            {error && (
                <p className="text-red-500 mt-4">
                    {error}
                </p>
            )}


            {/* Cards */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                <AdminStatusCard
                    icon={
                        <FileText
                            size={28}
                            className="text-green-600"
                        />
                    }
                    title="Total Reports"
                    count={loading ? "..." : stats.totalReports}
                    bgColor="bg-green-100"
                />


                <AdminStatusCard
                    icon={
                        <Clock3
                            size={28}
                            className="text-orange-500"
                        />
                    }
                    title="Pending"
                    count={loading ? "..." : stats.pendingReports}
                    bgColor="bg-orange-100"
                />


                <AdminStatusCard
                    icon={
                        <RefreshCcw
                            size={28}
                            className="text-blue-600"
                        />
                    }
                    title="In Progress"
                    count={loading ? "..." : stats.inProgressReports}
                    bgColor="bg-blue-100"
                />


                <AdminStatusCard
                    icon={
                        <CheckCircle
                            size={28}
                            className="text-green-600"
                        />
                    }
                    title="Resolved"
                    count={loading ? "..." : stats.resolvedReports}
                    bgColor="bg-green-100"
                />

            </div>

        </div>

    );

};

export default AdminStats;