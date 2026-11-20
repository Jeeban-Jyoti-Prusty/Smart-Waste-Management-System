import React from "react";
import { FaLeaf } from "react-icons/fa";
import Dustbin1 from "../../assets/Dustbin2.png";
import { useNavigate } from "react-router-dom";

const ReportWasteCTA = () => {
    const navigate = useNavigate();

    return (
        <section className="w-full bg-white py-5 px-5 sm:px-8 lg:px-[5%]">

            <div className="bg-linear-to-r from-green-700 to-green-600 rounded-3xl overflow-hidden">

                <div className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16 py-10 gap-10">

                    {/* Left Image */}

                    <div className="w-full lg:w-1/3 flex justify-center">

                        <img
                            src={Dustbin1}
                            alt="EcoWaste"
                            className="w-64 sm:w-72 lg:w-80"
                        />

                    </div>

                    {/* Right Content */}

                    <div className="w-full lg:w-2/3 text-center lg:text-left">

                        <h2 className="text-3xl lg:text-4xl font-bold text-white">

                            Let's Build a Cleaner,
                            <br />
                            Greener Future Together!

                        </h2>

                        <p className="text-green-100 mt-5 text-lg leading-8 max-w-2xl">

                            Join thousands of citizens who are taking action towards
                            a clean and sustainable environment by reporting waste
                            in your locality.

                        </p>

                        <button
                            onClick={() => navigate("/login")}
                            className="mt-8 inline-flex items-center gap-3 bg-white text-green-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg">

                            <FaLeaf />

                            Report Waste Now

                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default ReportWasteCTA;