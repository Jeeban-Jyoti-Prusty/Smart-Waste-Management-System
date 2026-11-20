import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const ViewReportCard = () => {

    const { id } = useParams();

    const [report, setReport] = useState(null);

    const getSingleReport = async () => {

        try {

            const response = await api.get(
                `/report/get-single-report/${id}`
            );

            setReport(response.data.report);

        } catch (error) {

            console.log(error.response?.data?.message || error.message);

        }

    };

    useEffect(() => {

        getSingleReport();

    }, []);

    return (

        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8">

            {/* Heading */}

            <h1 className="text-2xl sm:text-3xl font-bold mb-8">
                Report Details
            </h1>

            {/* Image */}

            <img
                src={report?.image}
                alt="Waste"
                className="w-full h-56 sm:h-72 lg:h-96 object-contain rounded-xl mb-8"
            />

            {/* Details */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div>

                    <p className="text-gray-500 text-sm">
                        Report ID
                    </p>

                    <h3 className="font-semibold text-lg">
                        {report?._id}
                    </h3>

                </div>

                <div>

                    <p className="text-gray-500 text-sm">
                        Waste Type
                    </p>

                    <h3 className="font-semibold text-lg">
                        {report?.wasteType}
                    </h3>

                </div>

                <div>

                    <p className="text-gray-500 text-sm">
                        Location
                    </p>

                    <h3 className="font-semibold text-lg">
                        {report?.location}
                    </h3>

                </div>

                <div>

                    <p className="text-gray-500 text-sm">
                        Date
                    </p>

                    <h3 className="font-semibold text-lg">
                        {new Date(report?.createdAt).toLocaleDateString()}
                    </h3>

                </div>

            </div>

            {/* Description */}

            <div className="mt-8">

                <p className="text-gray-500 mb-2 font-medium">
                    Description
                </p>

                <p className="text-gray-700 leading-7">
                    {report?.description}
                </p>

            </div>

            {/* Status */}

            <div className="mt-8">

                <span
                    className={`inline-block px-4 py-2 rounded-lg font-medium ${report?.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : report?.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                >
                    {report?.status}
                </span>

            </div>

        </div>

    );
};

export default ViewReportCard;