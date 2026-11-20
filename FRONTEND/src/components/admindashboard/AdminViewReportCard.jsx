
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api.js"
import DustbinImg from "../../assets/Dustbin2.png";

const AdminViewReportCard = ({ reportId }) => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionLoading, setActionLoading] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchReport = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    `/report/admin-get-single-report/${reportId}`
                );

                console.log("Single Report Response:", response.data);

                setReport(response.data.report);
            } catch (err) {
                console.error("Report fetch error:", err);
                console.log("Response:", err.response?.data);
                console.log("Status:", err.response?.status);

                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Report load nahi ho payi."
                );
            } finally {
                setLoading(false);
            }
        };

        if (reportId) {
            fetchReport();
        } else {
            setError("Report ID URL mein nahi mili.");
            setLoading(false);
        }
    }, [reportId]);



    const handleStatusUpdate = async (status) => {
        try {
            setActionLoading(true);
            setError("");

            const response = await api.patch(
                `/report/update-status/${reportId}`,
                { status }
            );

            setReport((previous) => ({
                ...previous,
                ...response.data.report,
            }));

            alert(`Report status updated to ${status}`);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Status update nahi ho paya."
            );
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Kya tum sach mein is report ko delete karna chahte ho?"
        );

        if (!confirmed) return;

        try {
            setActionLoading(true);
            setError("");

            await api.delete(`/report/delete-report/${reportId}`);

            alert("Report successfully deleted.");
            navigate("/admin/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Report delete nahi ho payi."
            );
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return <div className="p-8">Report load ho rahi hai...</div>;
    }

    if (error && !report) {
        return (
            <div className="bg-white rounded-xl shadow p-8">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    if (!report) return null;

    const reportDate = report.createdAt
        ? new Date(report.createdAt).toLocaleDateString()
        : "Not available";

    return (
        <div className="bg-white rounded-xl shadow p-8">
            <h1 className="text-3xl font-bold mb-8">
                Report Details
            </h1>

            <img
                src={report.image || DustbinImg}
                alt="Reported waste"
                className="w-full h-80 object-contain rounded-lg mb-8"
            />

            {error && (
                <p className="text-red-600 mb-4">{error}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <p className="text-gray-500">Report ID</p>
                    <h3 className="font-semibold">
                        #{report._id}
                    </h3>
                </div>

                <div>
                    <p className="text-gray-500">Reported By</p>
                    <h3 className="font-semibold">
                        {report.user?.fullName || "Unknown User"}
                    </h3>
                    {report.user?.email && (
                        <p className="text-sm text-gray-500">
                            {report.user.email}
                        </p>
                    )}
                </div>

                <div>
                    <p className="text-gray-500">Waste Type</p>
                    <h3 className="font-semibold">
                        {report.wasteType || "Not available"}
                    </h3>
                </div>

                <div>
                    <p className="text-gray-500">Location</p>
                    <h3 className="font-semibold">
                        {report.location || "Not available"}
                    </h3>
                </div>

                <div>
                    <p className="text-gray-500">Date</p>
                    <h3 className="font-semibold">{reportDate}</h3>
                </div>

                <div>
                    <p className="text-gray-500">Status</p>
                    <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md">
                        {report.status || "Pending"}
                    </span>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="font-semibold mb-2">
                    Description
                </h3>
                <p className="text-gray-600">
                    {report.description || "No description available."}
                </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
                <button
                    disabled={actionLoading || report.status === "Resolved"}
                    onClick={() => handleStatusUpdate("Resolved")}
                    className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg"
                >
                    Resolved
                </button>

                <button
                    disabled={actionLoading || report.status === "In Progress"}
                    onClick={() => handleStatusUpdate("In Progress")}
                    className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg"
                >
                    In Progress
                </button>

                <button
                    disabled={actionLoading}
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg"
                >
                    Delete
                </button>
            </div>

            {actionLoading && (
                <p className="text-sm text-gray-500 mt-4">
                    Please wait...
                </p>
            )}
        </div>
    );
};

export default AdminViewReportCard;
