import React, { useState } from "react";
import Sidebar from "../components/userdashboard/Sidebar";
import Header from "../components/userdashboard/Header";
import ReportTable from "../components/myreports/ReportTable";

const MyReports = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex-1 lg:ml-56">

                <Header setSidebarOpen={setSidebarOpen} />

                <main className="pt-24 px-5 sm:px-8 lg:px-6 pb-6">

                    <ReportTable />

                </main>

            </div>

        </div>
    );
};

export default MyReports;