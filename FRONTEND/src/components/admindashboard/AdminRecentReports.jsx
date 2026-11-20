import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

const AdminRecentReports = () => {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get all reports
    const getReports = async () => {

        try {

            const response = await api.get(
                "/report/get-all-reports"
            );

            console.log("Admin Reports:", response.data);

            setReports(response.data.reports || []);

        } catch (error) {

            console.log(
                error.response?.data?.message ||
                error.message
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        getReports();

    }, []);


    // Status color
    const statusColor = (status) => {

        switch (status) {

            case "Pending":
                return "bg-yellow-100 text-yellow-700";

            case "In Progress":
                return "bg-blue-100 text-blue-700";

            case "Resolved":
                return "bg-green-100 text-green-700";

            default:
                return "bg-gray-100 text-gray-700";
        }

    };


    return (

        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mt-8">

            {/* Heading */}

            <div className="flex justify-between items-center mb-6 gap-3">

                <h2 className="text-xl sm:text-2xl font-bold">
                    Recent Reports
                </h2>

                <Link
                    to="/admin/reports"
                    className="text-green-600 font-semibold hover:underline text-sm sm:text-base whitespace-nowrap"
                >
                    View All
                </Link>

            </div>


            {/* Loading */}

            {loading ? (

                <p className="text-center text-gray-500 py-8">
                    Loading reports...
                </p>

            ) : reports.length === 0 ? (

                <p className="text-center text-gray-500 py-8">
                    No reports found
                </p>

            ) : (

                <>

                    {/* ================= DESKTOP TABLE ================= */}

                    <div className="hidden md:block overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="text-left py-3 px-2">
                                        ID
                                    </th>

                                    <th className="text-left py-3 px-2">
                                        Title
                                    </th>

                                    <th className="text-left py-3 px-2">
                                        Location
                                    </th>

                                    <th className="text-left py-3 px-2">
                                        Reported By
                                    </th>

                                    <th className="text-left py-3 px-2">
                                        Status
                                    </th>

                                    <th className="text-left py-3 px-2">
                                        Date
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {reports.slice(0, 4).map((report) => (

                                    <tr
                                        key={report._id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >

                                        {/* ID */}

                                        <td className="py-4 px-2 whitespace-nowrap">
                                            #{report._id.slice(-6)}
                                        </td>


                                        {/* Title */}

                                        <td className="py-4 px-2">
                                            <span className="line-clamp-1">
                                                {report.title}
                                            </span>
                                        </td>


                                        {/* Location */}

                                        <td className="py-4 px-2">
                                            <span className="line-clamp-1">
                                                {report.location}
                                            </span>
                                        </td>


                                        {/* Reported By */}

                                        <td className="py-4 px-2">
                                            <span className="line-clamp-1">
                                                {report.user?.fullName || "Unknown"}
                                            </span>
                                        </td>


                                        {/* Status */}

                                        <td className="py-4 px-2">

                                            <span
                                                className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${statusColor(
                                                    report.status
                                                )}`}
                                            >
                                                {report.status}
                                            </span>

                                        </td>


                                        {/* Date */}

                                        <td className="py-4 px-2 whitespace-nowrap">

                                            {new Date(
                                                report.createdAt
                                            ).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>


                    {/* ================= MOBILE CARDS ================= */}

                    <div className="md:hidden space-y-4">

                        {reports.slice(0, 4).map((report) => (

                            <div
                                key={report._id}
                                className="border rounded-lg p-4 hover:bg-gray-50 transition"
                            >

                                {/* Title */}

                                <div className="flex justify-between items-start gap-3 mb-4">

                                    <h3 className="font-semibold text-base wrap-break-word">
                                        {report.title}
                                    </h3>

                                    <span className="text-xs text-gray-500 whitespace-nowrap">
                                        #{report._id.slice(-6)}
                                    </span>

                                </div>


                                {/* Location */}

                                <div className="mb-3">

                                    <p className="text-xs text-gray-500">
                                        Location
                                    </p>

                                    <p className="text-sm font-medium wrap-break-word">
                                        {report.location}
                                    </p>

                                </div>


                                {/* Reported By */}

                                <div className="mb-3">

                                    <p className="text-xs text-gray-500">
                                        Reported By
                                    </p>

                                    <p className="text-sm font-medium wrap-break-word">
                                        {report.user?.fullName || "Unknown"}
                                    </p>

                                </div>


                                {/* Bottom section */}

                                <div className="flex justify-between items-center gap-3 pt-3 border-t">

                                    {/* Status */}

                                    <span
                                        className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap ${statusColor(
                                            report.status
                                        )}`}
                                    >
                                        {report.status}
                                    </span>


                                    {/* Date */}

                                    <span className="text-xs text-gray-500 whitespace-nowrap">

                                        {new Date(
                                            report.createdAt
                                        ).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}

                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                </>

            )}

        </div>

    );
};

export default AdminRecentReports;