import React, { useEffect, useState } from "react";
import {
    Eye,
    CheckCircle,
    Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../api/api";

const AdminReportTable = () => {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");


    // =========================
    // GET ALL REPORTS
    // =========================

    const getReports = async () => {

        try {

            const response = await api.get(
                "/report/get-all-reports"
            );

            console.log("All Reports:", response.data);

            setReports(
                response.data.reports || []
            );

        } catch (error) {

            console.log(
                error.response?.data?.message ||
                error.message
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // UPDATE STATUS
    // =========================

    const updateStatus = async (id, status) => {

        try {

            const response = await api.patch(
                `/report/update-status/${id}`,
                {
                    status: status
                }
            );

            console.log(
                "Status Updated:",
                response.data
            );

            // Update UI immediately
            setReports((prevReports) =>
                prevReports.map((report) =>
                    report._id === id
                        ? {
                            ...report,
                            status: status
                        }
                        : report
                )
            );

        } catch (error) {

            console.log(
                error.response?.data?.message ||
                error.message
            );

        }

    };


    // =========================
    // DELETE REPORT
    // =========================

    const deleteReport = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this report?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await api.delete(
                `/report/delete-report/${id}`
            );

            console.log(
                "Report Deleted:",
                response.data
            );

            setReports((prevReports) =>
                prevReports.filter(
                    (report) =>
                        report._id !== id
                )
            );

        } catch (error) {

            console.log(
                error.response?.data?.message ||
                error.message
            );

        }

    };


    // =========================
    // LOAD REPORTS
    // =========================

    useEffect(() => {

        getReports();

    }, []);


    // =========================
    // STATUS COLOR
    // =========================

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


    // =========================
    // SEARCH
    // =========================

    const filteredReports = reports.filter(
        (report) => {

            const searchText =
                search.toLowerCase();

            return (

                report.title
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                report.location
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                report.user?.fullName
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                report.status
                    ?.toLowerCase()
                    .includes(searchText)

            );

        }
    );


    return (

        <div className="bg-white rounded-xl shadow p-4 sm:p-6">

            {/* =========================
                HEADER
            ========================= */}

            <div className="
                flex
                flex-col
                sm:flex-row
                justify-between
                sm:items-center
                gap-4
                mb-6
            ">

                <h2 className="
                    text-2xl
                    sm:text-3xl
                    font-bold
                ">
                    All Reports
                </h2>


                {/* Search */}

                <input
                    type="text"
                    placeholder="Search reports..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="
                        border
                        border-gray-300
                        rounded-lg
                        px-4
                        py-2.5
                        outline-none
                        focus:border-green-600
                        focus:ring-1
                        focus:ring-green-600
                        w-full
                        sm:w-64
                    "
                />

            </div>


            {/* =========================
                LOADING
            ========================= */}

            {loading ? (

                <div className="
                    flex
                    justify-center
                    items-center
                    py-12
                ">

                    <p className="text-gray-500">
                        Loading reports...
                    </p>

                </div>

            ) : reports.length === 0 ? (

                <div className="
                    text-center
                    py-12
                ">

                    <p className="text-gray-500">
                        No reports found
                    </p>

                </div>

            ) : filteredReports.length === 0 ? (

                <div className="
                    text-center
                    py-12
                ">

                    <p className="text-gray-500">
                        No reports match your search.
                    </p>

                </div>

            ) : (

                <>
                    {/* =================================================
                        DESKTOP TABLE
                    ================================================= */}

                    <div className="hidden md:block overflow-x-auto">

                        <table className="w-full">

                            {/* Table Header */}

                            <thead>

                                <tr className="
                                    border-b
                                    border-gray-200
                                ">

                                    <th className="
                                        text-left
                                        py-3
                                        px-2
                                        text-sm
                                        font-semibold
                                        text-gray-600
                                    ">
                                        ID
                                    </th>


                                    <th className="
                                        text-left
                                        py-3
                                        px-2
                                        text-sm
                                        font-semibold
                                        text-gray-600
                                    ">
                                        Title
                                    </th>


                                    <th className="
                                        text-left
                                        py-3
                                        px-2
                                        text-sm
                                        font-semibold
                                        text-gray-600
                                    ">
                                        Location
                                    </th>


                                    <th className="
                                        text-left
                                        py-3
                                        px-2
                                        text-sm
                                        font-semibold
                                        text-gray-600
                                    ">
                                        User
                                    </th>


                                    <th className="
                                        text-left
                                        py-3
                                        px-2
                                        text-sm
                                        font-semibold
                                        text-gray-600
                                    ">
                                        Status
                                    </th>


                                    <th className="
                                        text-center
                                        py-3
                                        px-2
                                        text-sm
                                        font-semibold
                                        text-gray-600
                                    ">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            {/* Table Body */}

                            <tbody>

                                {filteredReports.map(
                                    (report) => (

                                        <tr
                                            key={report._id}
                                            className="
                                                border-b
                                                border-gray-100
                                                hover:bg-gray-50
                                                transition
                                            "
                                        >

                                            {/* ID */}

                                            <td className="
                                                py-4
                                                px-2
                                                text-sm
                                                font-medium
                                            ">
                                                #{report._id.slice(-6)}
                                            </td>


                                            {/* Title */}

                                            <td className="
                                                py-4
                                                px-2
                                                text-sm
                                                max-w-48
                                            ">
                                                <p className="
                                                    truncate
                                                ">
                                                    {report.title}
                                                </p>
                                            </td>


                                            {/* Location */}

                                            <td className="
                                                py-4
                                                px-2
                                                text-sm
                                                max-w-48
                                            ">
                                                <p className="
                                                    truncate
                                                ">
                                                    {report.location}
                                                </p>
                                            </td>


                                            {/* User */}

                                            <td className="
                                                py-4
                                                px-2
                                                text-sm
                                            ">
                                                {report.user?.fullName ||
                                                    "Unknown"}
                                            </td>


                                            {/* Status */}

                                            <td className="
                                                py-4
                                                px-2
                                            ">

                                                <span
                                                    className={`
                                                        inline-block
                                                        px-3
                                                        py-1
                                                        rounded-md
                                                        text-xs
                                                        font-medium
                                                        whitespace-nowrap
                                                        ${statusColor(
                                                        report.status
                                                    )}
                                                    `}
                                                >
                                                    {report.status}
                                                </span>

                                            </td>


                                            {/* Actions */}

                                            <td className="
                                                py-4
                                                px-2
                                            ">

                                                <div className="
                                                    flex
                                                    justify-center
                                                    items-center
                                                    gap-4
                                                ">

                                                    {/* View */}

                                                    <Link
                                                        to={`/admin/view-report/${report._id}`}
                                                        title="View Report"
                                                        className="
                                                            p-1
                                                            rounded
                                                            hover:bg-blue-50
                                                        "
                                                    >

                                                        <Eye
                                                            size={20}
                                                            className="
                                                                text-blue-600
                                                            "
                                                        />

                                                    </Link>


                                                    {/* Resolve */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateStatus(
                                                                report._id,
                                                                "Resolved"
                                                            )
                                                        }
                                                        title="Mark Resolved"
                                                        className="
                                                            p-1
                                                            rounded
                                                            hover:bg-green-50
                                                        "
                                                    >

                                                        <CheckCircle
                                                            size={20}
                                                            className="
                                                                text-green-600
                                                            "
                                                        />

                                                    </button>


                                                    {/* Delete */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteReport(
                                                                report._id
                                                            )
                                                        }
                                                        title="Delete Report"
                                                        className="
                                                            p-1
                                                            rounded
                                                            hover:bg-red-50
                                                        "
                                                    >

                                                        <Trash2
                                                            size={20}
                                                            className="
                                                                text-red-600
                                                            "
                                                        />

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* =================================================
                        MOBILE CARDS
                    ================================================= */}

                    <div className="
                        md:hidden
                        space-y-4
                    ">

                        {filteredReports.map(
                            (report) => (

                                <div
                                    key={report._id}
                                    className="
                                        border
                                        border-gray-200
                                        rounded-xl
                                        p-4
                                        shadow-sm
                                        hover:shadow-md
                                        transition
                                    "
                                >

                                    {/* Card Header */}

                                    <div className="
                                        flex
                                        justify-between
                                        items-start
                                        gap-3
                                        mb-4
                                    ">

                                        <div>

                                            <p className="
                                                text-xs
                                                text-gray-500
                                                mb-1
                                            ">
                                                Report ID
                                            </p>

                                            <p className="
                                                font-semibold
                                                text-gray-800
                                            ">
                                                #{report._id.slice(-6)}
                                            </p>

                                        </div>


                                        {/* Status */}

                                        <span
                                            className={`
                                                px-3
                                                py-1
                                                rounded-md
                                                text-xs
                                                font-medium
                                                whitespace-nowrap
                                                ${statusColor(
                                                report.status
                                            )}
                                            `}
                                        >
                                            {report.status}
                                        </span>

                                    </div>


                                    {/* Title */}

                                    <div className="mb-3">

                                        <p className="
                                            text-xs
                                            text-gray-500
                                            mb-1
                                        ">
                                            Title
                                        </p>

                                        <p className="
                                            font-semibold
                                            text-gray-800
                                        ">
                                            {report.title}
                                        </p>

                                    </div>


                                    {/* Location */}

                                    <div className="mb-3">

                                        <p className="
                                            text-xs
                                            text-gray-500
                                            mb-1
                                        ">
                                            Location
                                        </p>

                                        <p className="
                                            text-sm
                                            text-gray-700
                                        ">
                                            {report.location}
                                        </p>

                                    </div>


                                    {/* User */}

                                    <div className="mb-4">

                                        <p className="
                                            text-xs
                                            text-gray-500
                                            mb-1
                                        ">
                                            Reported By
                                        </p>

                                        <p className="
                                            text-sm
                                            font-medium
                                            text-gray-800
                                        ">
                                            {report.user?.fullName ||
                                                "Unknown"}
                                        </p>

                                    </div>


                                    {/* Divider */}

                                    <div className="
                                        border-t
                                        border-gray-200
                                        pt-4
                                    ">


                                        {/* Actions */}

                                        <div className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-2
                                        ">

                                            {/* View */}

                                            <Link
                                                to={`/admin/view-report/${report._id}`}
                                                className="
                                                    flex
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    flex-1
                                                    bg-blue-50
                                                    text-blue-600
                                                    py-2.5
                                                    rounded-lg
                                                    text-sm
                                                    font-medium
                                                    hover:bg-blue-100
                                                    transition
                                                "
                                            >

                                                <Eye size={18} />

                                                View

                                            </Link>


                                            {/* Resolve */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateStatus(
                                                        report._id,
                                                        "Resolved"
                                                    )
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    flex-1
                                                    bg-green-50
                                                    text-green-600
                                                    py-2.5
                                                    rounded-lg
                                                    text-sm
                                                    font-medium
                                                    hover:bg-green-100
                                                    transition
                                                "
                                            >

                                                <CheckCircle
                                                    size={18}
                                                />

                                                Resolve

                                            </button>


                                            {/* Delete */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteReport(
                                                        report._id
                                                    )
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    flex-1
                                                    bg-red-50
                                                    text-red-600
                                                    py-2.5
                                                    rounded-lg
                                                    text-sm
                                                    font-medium
                                                    hover:bg-red-100
                                                    transition
                                                "
                                            >

                                                <Trash2
                                                    size={18}
                                                />

                                                Delete

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </>

            )}

        </div>

    );

};

export default AdminReportTable;