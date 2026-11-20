import React, { useEffect, useState } from "react";
import StatusCard from "./StatusCard";

import api from "../../api/api";

import {
    FileText,
    Clock3,
    RefreshCcw,
    CheckCircle,
} from "lucide-react";

const DashboardStats = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        totalReports: 0,
        pendingReports: 0,
        inProgressReports: 0,
        resolvedReports: 0,
    });

    const getProfile = async () => {
        try {

            const response = await api.get("/auth/profile");

            setUser(response.data.user);


        } catch (error) {

            console.log(error.response?.data?.message || error.message);

        }
    };

    const getDashboardStats = async () => {

        try {

            const response = await api.get(
                "/report/my-dashboard-stats"
            );

            console.log(response.data);

            setStats(response.data.stats);
            setLoading(false);

        } catch (error) {

            console.log(
                error.response?.data?.message || error.message
            );
            setLoading(false);

        }

    };

    useEffect(() => {
        getProfile();
        getDashboardStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-60">
                <p className="text-lg font-semibold text-gray-500">
                    Loading Dashboard...
                </p>
            </div>
        );
    }


    return (
        <div>

            {/* Heading */}

            <p className="text-lg text-gray-500 mb-8">
                Welcome back, {user?.fullName || "Loading..."}
            </p>

            {/* Cards */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                <StatusCard
                    icon={<FileText size={28} className="text-green-600" />}
                    title="Total Reports"
                    count={stats.totalReports}
                    bgColor="bg-green-100"
                />

                <StatusCard
                    icon={<Clock3 size={28} className="text-orange-500" />}
                    title="Pending"
                    count={stats.pendingReports}
                    bgColor="bg-orange-100"
                />

                <StatusCard
                    icon={<RefreshCcw size={28} className="text-blue-500" />}
                    title="In Progress"
                    count={stats.inProgressReports}
                    bgColor="bg-blue-100"
                />

                <StatusCard
                    icon={<CheckCircle size={28} className="text-green-600" />}
                    title="Resolved"
                    count={stats.resolvedReports}
                    bgColor="bg-green-100"
                />

            </div>

        </div>
    );
};

export default DashboardStats;