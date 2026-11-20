import React from "react";
import { TbReport } from "react-icons/tb";
import { MdEditLocationAlt } from "react-icons/md";
import { ImLeaf } from "react-icons/im";
import { FcBusinessman } from "react-icons/fc";

const Features = () => {
    return (
        <div className="w-full bg-white py-16 px-5 sm:px-8 lg:px-[5%]">

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-bold text-center lg:text-left">
                What We Do
            </h1>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">

                {/* Card 1 */}
                <div className="bg-gray-100 shadow-lg rounded-xl p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

                    <div className="w-20 h-20 rounded-full bg-red-200 flex items-center justify-center">
                        <TbReport className="text-red-600 text-4xl" />
                    </div>

                    <h2 className="text-xl font-bold mt-5">
                        Report Waste
                    </h2>

                    <p className="text-gray-600 mt-4 leading-7">
                        Easily report waste in your area with images and location.
                    </p>

                </div>

                {/* Card 2 */}
                <div className="bg-gray-100 shadow-lg rounded-xl p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

                    <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center">
                        <MdEditLocationAlt className="text-blue-600 text-4xl" />
                    </div>

                    <h2 className="text-xl font-bold mt-5">
                        Track Status
                    </h2>

                    <p className="text-gray-600 mt-4 leading-7">
                        Track the status of your reported issues in real-time.
                    </p>

                </div>

                {/* Card 3 */}
                <div className="bg-gray-100 shadow-lg rounded-xl p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

                    <div className="w-20 h-20 rounded-full bg-green-200 flex items-center justify-center">
                        <ImLeaf className="text-green-600 text-4xl" />
                    </div>

                    <h2 className="text-xl font-bold mt-5">
                        Clean Environment
                    </h2>

                    <p className="text-gray-600 mt-4 leading-7">
                        Help make our city cleaner and greener for everyone.
                    </p>

                </div>

                {/* Card 4 */}
                <div className="bg-gray-100 shadow-lg rounded-xl p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

                    <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
                        <FcBusinessman className="text-5xl" />
                    </div>

                    <h2 className="text-xl font-bold mt-5">
                        Better Future
                    </h2>

                    <p className="text-gray-600 mt-4 leading-7">
                        Together we can build a better and sustainable future.
                    </p>

                </div>

            </div>

        </div>
    );
};

export default Features;