import React, { useState } from "react";
import AdminSidebar from "../components/admindashboard/AdminSidebar";
import AdminHeader from "../components/admindashboard/AdminHeader";
import AdminReportTable from "../components/admindashboard/AdminReportTable";

const AdminReports = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="flex min-h-screen bg-gray-50">

            <AdminSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex-1 lg:ml-56">

                <AdminHeader
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="pt-24 px-5 sm:px-8 lg:px-6 pb-6">

                    <AdminReportTable />

                </main>

            </div>

        </div>

    );
};

export default AdminReports;