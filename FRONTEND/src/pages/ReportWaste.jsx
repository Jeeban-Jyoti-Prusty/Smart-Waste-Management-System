import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/userdashboard/Sidebar";
import Header from "../components/userdashboard/Header";
import TipsCard from "../components/report/TipsCard";
import UploadBox from "../components/report/UploadBox";
import DustbinImg from "../assets/Dustbin2.png";
import api from "../api/api";

const ReportWaste = () => {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [reportData, setReportData] = useState({
        title: "",
        description: "",
        wasteType: "",
        location: "",
        image: null,
    });

    // Handle Input Change
    const handleChange = (e) => {
        setReportData({
            ...reportData,
            [e.target.name]: e.target.value,
        });
    };

    // Submit Report
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (
            !reportData.title ||
            !reportData.description ||
            !reportData.wasteType ||
            !reportData.location ||
            !reportData.image
        ) {
            return alert("Please fill all fields and upload an image.");
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("title", reportData.title);
            formData.append("description", reportData.description);
            formData.append("wasteType", reportData.wasteType);
            formData.append("location", reportData.location);
            formData.append("image", reportData.image);

            const response = await api.post(
                "/report/create-report",
                formData
            );

            alert(response.data.message);

            // Reset Form
            setReportData({
                title: "",
                description: "",
                wasteType: "",
                location: "",
                image: null,
            });

            console.log(response.data);

            // Optional
            // navigate("/my-reports");

        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex-1 lg:ml-56">

                <Header setSidebarOpen={setSidebarOpen} />

                <main className="pt-24 px-5 sm:px-8 lg:px-8 pb-8">

                    {/* Heading */}

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">

                        <h1 className="text-2xl sm:text-3xl font-bold">
                            Report Waste
                        </h1>

                        <button
                            onClick={() => navigate(-1)}
                            className="text-green-700 font-semibold hover:text-green-800"
                        >
                            ← Back
                        </button>

                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                        {/* Form */}

                        <div className="xl:col-span-2 bg-white rounded-xl shadow p-6">

                            <form onSubmit={handleSubmit}>

                                {/* Title */}

                                <div className="mb-6">

                                    <label className="block mb-2 font-semibold">
                                        Title
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={reportData.title}
                                        onChange={handleChange}
                                        placeholder="Enter report title"
                                        className="w-full border rounded-xl p-3 outline-none focus:border-green-600"
                                    />

                                </div>

                                {/* Description */}

                                <div className="mb-6">

                                    <label className="block mb-2 font-semibold">
                                        Description
                                    </label>

                                    <textarea
                                        rows="5"
                                        name="description"
                                        value={reportData.description}
                                        onChange={handleChange}
                                        placeholder="Describe the waste issue..."
                                        className="w-full border rounded-xl p-3 resize-none outline-none focus:border-green-600"
                                    />

                                </div>

                                {/* Waste Type */}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                                    <div>

                                        <label className="block mb-2 font-semibold">
                                            Waste Type
                                        </label>

                                        <select
                                            name="wasteType"
                                            value={reportData.wasteType}
                                            onChange={handleChange}
                                            className="w-full border rounded-xl p-3"
                                        >
                                            <option value="">Select Waste Type</option>
                                            <option value="Plastic Waste">Plastic Waste</option>
                                            <option value="Organic Waste">Organic Waste</option>
                                            <option value="Paper Waste">Paper Waste</option>
                                            <option value="Glass Waste">Glass Waste</option>
                                            <option value="Construction Waste">Construction Waste</option>
                                        </select>

                                    </div>

                                    <div>

                                        <label className="block mb-2 font-semibold">
                                            Location
                                        </label>

                                        <input
                                            type="text"
                                            name="location"
                                            value={reportData.location}
                                            onChange={handleChange}
                                            placeholder="Enter location"
                                            className="w-full border rounded-xl p-3 outline-none focus:border-green-600"
                                        />

                                    </div>

                                </div>

                                <UploadBox
                                    reportData={reportData}
                                    setReportData={setReportData}
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full mt-6 bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition"
                                >
                                    {loading ? "Submitting..." : "Submit Report"}
                                </button>

                            </form>

                        </div>

                        {/* Right Side */}

                        <div className="space-y-6">

                            <TipsCard />

                            <div className="bg-white rounded-xl shadow p-4 flex justify-center">

                                <img
                                    src={DustbinImg}
                                    alt="Dustbin"
                                    className="w-52 sm:w-64 lg:w-full object-contain"
                                />

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
};

export default ReportWaste;