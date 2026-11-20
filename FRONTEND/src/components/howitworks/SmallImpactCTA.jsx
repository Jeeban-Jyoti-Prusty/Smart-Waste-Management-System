import React from "react";
import { FaLeaf } from "react-icons/fa";
import EarthImg from "../../assets/ecofavicon.png"; // Apni image use karo
import { useNavigate } from "react-router-dom";

const SmallImpactCTA = () => {
    const navigate = useNavigate();

    return (
        <section className="w-full bg-white py-6 px-5 sm:px-8 lg:px-[5%]">

            <div
                className="relative overflow-hidden border border-green-200 rounded-3xl bg-linear-to-r from-green-50 via-white to-green-50">

                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 px-8 lg:px-14 py-10">

                    {/* Left Image */}

                    <div className="w-full lg:w-[32%] flex justify-center">

                        <img src={EarthImg} alt="Earth" className="w-72 lg:w-80 object-contain" />

                    </div>

                    {/* Right Content */}

                    <div className="w-full lg:w-[68%] text-center lg:text-left">

                        <h2 className="text-4xl font-bold leading-tight">

                            Small Steps,
                            <span className="text-green-700">
                                {" "}Big Impact
                            </span>

                        </h2>

                        <p className="mt-5 text-gray-600 text-lg leading-8 max-w-xl">

                            Your one report can make your city a better place to
                            live. Let's work together for a cleaner tomorrow.

                        </p>

                        <button
                            onClick={() => navigate("/login")}
                            className="mt-8 flex items-center gap-3 bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg">

                            <FaLeaf />

                            Report Waste Now

                        </button>

                    </div>

                </div>

                {/* Background Decoration */}

                <div className="hidden lg:block absolute right-0 bottom-0 opacity-10">

                    <svg width="420" height="220" viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="70" cy="170" r="70" fill="#16A34A" />
                        <circle cx="200" cy="120" r="95" fill="#22C55E" />
                        <circle cx="340" cy="180" r="60" fill="#4ADE80" />
                    </svg>

                </div>

            </div>

        </section>
    );
};

export default SmallImpactCTA;