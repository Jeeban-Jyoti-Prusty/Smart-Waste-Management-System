import React from "react";
import { Plus, List } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {

    const navigate = useNavigate();

    return (

        <div className="mt-10">

            {/* Heading */}

            <h2 className="text-2xl font-bold">
                Quick Actions
            </h2>

            <p className="text-gray-500 mt-2">
                Perform common tasks quickly.
            </p>

            {/* Buttons */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                {/* Report Waste */}

                <button
                    onClick={() => navigate("/report-waste")}
                    className="bg-green-700 hover:bg-green-800 text-white rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                >

                    <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">

                        <Plus size={30} />

                    </div>

                    <div className="text-left">

                        <h3 className="text-xl font-bold">
                            Report Waste
                        </h3>

                        <p className="text-green-100 text-sm mt-1">
                            Create a new waste report.
                        </p>

                    </div>

                </button>

                {/* My Reports */}

                <button
                    onClick={() => navigate("/my-reports")}
                    className="bg-white border-2 border-green-700 rounded-2xl p-6 flex items-center gap-5 hover:bg-green-50 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                >

                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-700">

                        <List size={30} />

                    </div>

                    <div className="text-left">

                        <h3 className="text-xl font-bold text-green-700">
                            My Reports
                        </h3>

                        <p className="text-gray-500 text-sm mt-1">
                            View all your submitted reports.
                        </p>

                    </div>

                </button>

            </div>

        </div>

    );
};

export default QuickActions;