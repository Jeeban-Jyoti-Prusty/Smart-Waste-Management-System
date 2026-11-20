import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const RecentReports = () => {

    const navigate = useNavigate();

    const [reports, setReports] = useState([]);

    const getRecentReports = async () => {

        try {

            const response = await api.get("/report/my-report");

            setReports(response.data.reports);

        } catch (error) {

            console.log(error.response?.data?.message || error.message);

        }

    };

    useEffect(() => {

        getRecentReports();

    }, []);

    const getStatusClass = (status) => {

        if (status === "Pending") {
            return "bg-yellow-100 text-yellow-700";
        }

        if (status === "In Progress") {
            return "bg-blue-100 text-blue-700";
        }

        if (status === "Resolved") {
            return "bg-green-100 text-green-700";
        }

        return "bg-gray-100 text-gray-700";
    };

    return (
        <div className="bg-white rounded-2xl shadow-md mt-8 p-6">

            {/* Header */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                <div>

                    <h2 className="text-2xl font-bold">
                        Recent Reports
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                        Your recently submitted reports
                    </p>

                </div>

                <button
                    onClick={() => navigate("/my-reports")}
                    className="w-full sm:w-auto border border-green-600 text-green-700 px-5 py-2 rounded-lg hover:bg-green-600 hover:text-white transition"
                >
                    View All
                </button>

            </div>

            <div className="overflow-x-auto">

                <table className="min-w-full w-full">

                    <thead>

                        <tr className="border-b bg-gray-50">

                            <th className="text-left py-4 px-3 font-semibold">
                                ID
                            </th>

                            <th className="text-left py-4 px-3 font-semibold">
                                Title
                            </th>

                            <th className="text-left py-4 px-3 font-semibold">
                                Location
                            </th>

                            <th className="text-left py-4 px-3 font-semibold">
                                Status
                            </th>

                            <th className="text-left py-4 px-3 font-semibold">
                                Date
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            reports.length > 0 ? (

                                reports.slice(0, 3).map((report, index) => (

                                    <tr
                                        key={report._id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >

                                        <td className="py-4 px-3">
                                            #{index + 1}
                                        </td>

                                        <td className="py-4 px-3 font-medium">
                                            {report.title}
                                        </td>

                                        <td className="py-4 px-3">
                                            {report.location}
                                        </td>

                                        <td className="py-4 px-3">

                                            <span
                                                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(report.status)}`}
                                            >
                                                {report.status}
                                            </span>

                                        </td>

                                        <td className="py-4 px-3">
                                            {new Date(report.createdAt).toLocaleDateString()}
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center py-8 text-gray-500"
                                    >
                                        No Reports Found
                                    </td>

                                </tr>

                            )
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default RecentReports;