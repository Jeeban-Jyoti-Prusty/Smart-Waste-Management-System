import React, { useState } from "react";
import Sidebar from "../components/userdashboard/Sidebar";
import Header from "../components/userdashboard/Header";
import DashboardStats from "../components/userdashboard/DashboardStats";
import RecentReports from "../components/userdashboard/RecentReports";
import QuickActions from "../components/userdashboard/QuickActions";

const UserDashboard = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className=" flex-1 lg:ml-56">

                <Header
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="pt-24 px-6 pb-6 bg-gray-50 min-h-screen">

                    <DashboardStats />

                    <RecentReports />

                    <QuickActions />

                </main>

            </div>

        </div>
    );
};

export default UserDashboard;