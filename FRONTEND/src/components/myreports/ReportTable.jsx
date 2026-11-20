import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../api/api";

const ReportTable = () => {

    const [reports, setReports] = useState([]);

    const getMyReports = async () => {

        try {

            const response = await api.get("/report/my-report");

            setReports(response.data.reports);

        } catch (error) {

            console.log(error.response?.data?.message || error.message);

        }

    };

    useEffect(() => {

        getMyReports();

    }, []);

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

        <div className="bg-white rounded-2xl shadow-lg p-5">

            {/* Heading */}

            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6">

                <h1 className="text-2xl sm:text-3xl font-bold">

                    My Reports

                </h1>

                <p className="text-gray-500 text-sm">

                    Total Reports: {reports.length}

                </p>

            </div>

            {/* ================= Desktop Table ================= */}

            <div className="hidden md:block overflow-x-auto">

                <table className="w-full min-w-212.5">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="text-left px-4 py-4">ID</th>
                            <th className="text-left px-4 py-4">Title</th>
                            <th className="text-left px-4 py-4">Location</th>
                            <th className="text-left px-4 py-4">Status</th>
                            <th className="text-left px-4 py-4">Date</th>
                            <th className="text-center px-4 py-4">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            reports.length > 0 ? (

                                reports.map((report, index) => (

                                    <tr
                                        key={report._id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >

                                        <td className="px-4 py-5">

                                            #{index + 1}

                                        </td>

                                        <td className="px-4">

                                            {report.title}

                                        </td>

                                        <td className="px-4">

                                            {report.location}

                                        </td>

                                        <td className="px-4">

                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor(report.status)}`}
                                            >

                                                {report.status}

                                            </span>

                                        </td>

                                        <td className="px-4">

                                            {new Date(report.createdAt).toLocaleDateString()}

                                        </td>

                                        <td className="px-4">

                                            <div className="flex justify-center">

                                                <Link to={`/view-report/${report._id}`}>

                                                    <button className="p-2 rounded-full hover:bg-green-100">

                                                        <Eye size={20} />

                                                    </button>

                                                </Link>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
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

            {/* ================= Mobile Cards ================= */}

            <div className="md:hidden space-y-4">

                {

                    reports.length > 0 ? (

                        reports.map((report, index) => (

                            <div
                                key={report._id}
                                className="border rounded-xl p-4 shadow-sm"
                            >

                                <div className="flex justify-between items-start">

                                    <div>

                                        <h2 className="font-bold text-lg">

                                            {report.title}

                                        </h2>

                                        <p className="text-gray-500 text-sm">

                                            #{index + 1}

                                        </p>

                                    </div>

                                    <Link to={`/view-report/${report._id}`}>

                                        <button className="p-2 rounded-full hover:bg-green-100">

                                            <Eye size={22} />

                                        </button>

                                    </Link>

                                </div>

                                <div className="mt-4 space-y-2 text-sm">

                                    <p>

                                        <span className="font-semibold">

                                            Location :

                                        </span>{" "}

                                        {report.location}

                                    </p>

                                    <p>

                                        <span className="font-semibold">

                                            Date :

                                        </span>{" "}

                                        {new Date(report.createdAt).toLocaleDateString()}

                                    </p>

                                    <div>

                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusColor(report.status)}`}
                                        >

                                            {report.status}

                                        </span>

                                    </div>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="text-center text-gray-500 py-8">

                            No Reports Found

                        </div>

                    )

                }

            </div>

        </div>

    );

};

export default ReportTable;