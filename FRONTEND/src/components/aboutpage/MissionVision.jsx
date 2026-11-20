import React from "react";
import { FaBullseye, FaEye } from "react-icons/fa";

const MissionVision = () => {
    return (
        <section className="w-full bg-white py-16 px-5 sm:px-8 lg:px-[5%] ">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Mission Card */}
                <div className="bg-green-50 rounded-3xl shadow-md p-8 text-center h-95 flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300">

                    <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <FaBullseye className="text-4xl text-green-600" />
                    </div>

                    <h2 className="text-3xl font-bold text-green-700 mt-6">
                        Our Mission
                    </h2>

                    <div className="w-12 h-1 bg-green-600 rounded-full mt-3"></div>

                    <p className="mt-6 text-gray-600 text-base leading-8">
                        Our mission is to encourage citizens to report waste easily,
                        improve communication with municipal authorities, and promote
                        a clean and healthy environment.
                    </p>

                </div>

                {/* Vision Card */}
                <div className="bg-blue-50 rounded-3xl shadow-md p-8 text-center h-95 flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300">

                    {/* Icon */}
                    <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">

                        <FaEye className="text-blue-600 text-4xl" />

                    </div>

                    {/* Heading */}
                    <h2 className="mt-6 text-3xl font-bold text-blue-700">
                        Our Vision
                    </h2>

                    {/* Underline */}
                    <div className="w-12 h-1 bg-blue-600 rounded-full mt-3"></div>

                    {/* Text */}
                    <p className="mt-6 text-base text-gray-600 leading-8 max-w-sm">

                        Our vision is to build smart cities where technology and
                        responsible behaviour work together to create a clean,
                        green and sustainable future for all.

                    </p>

                </div>

            </div>

        </section>
    );
};

export default MissionVision;