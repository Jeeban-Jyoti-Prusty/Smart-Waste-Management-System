import React, { useState } from "react";
import Sidebar from "../components/userdashboard/Sidebar";
import Header from "../components/userdashboard/Header";
import ViewReportCard from "../components/report/ViewReportCard";

const ViewReport = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* Sidebar */}

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Main Content */}

            <div className="flex-1 lg:ml-56">

                {/* Header */}

                <Header setSidebarOpen={setSidebarOpen} />

                {/* Page */}

                <main className="pt-24 px-5 sm:px-8 lg:px-8 pb-8">

                    <ViewReportCard />

                </main>

            </div>

        </div>
    );
};

export default ViewReport;