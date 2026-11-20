import React from "react";
import {
    FaSearch,
    FaCamera,
    FaBell,
    FaTruck,
    FaCheckCircle,
    FaArrowRight,
} from "react-icons/fa";

const steps = [
    {
        id: 1,
        icon: <FaSearch />,
        title: "Identify Waste",
        desc: "Find a waste issue in your area that needs attention.",
    },
    {
        id: 2,
        icon: <FaCamera />,
        title: "Report It",
        desc: "Take a photo, add location and submit your report.",
    },
    {
        id: 3,
        icon: <FaBell />,
        title: "Notify Authorities",
        desc: "Your report is sent to the municipal authorities.",
    },
    {
        id: 4,
        icon: <FaTruck />,
        title: "Action Taken",
        desc: "Authorities review the report and clean the waste.",
    },
    {
        id: 5,
        icon: <FaCheckCircle />,
        title: "Track Status",
        desc: "Receive updates until your complaint is resolved.",
    },
];

const StepProcess = () => {
    return (
        <section className="py-12 px-5 sm:px-8 lg:px-[5%] bg-white ">

            {/* Heading */}

            <div className="text-center">

                <h2 className="text-4xl font-bold">
                    Step-by-Step{" "}
                    <span className="text-green-700">Process</span>
                </h2>

                <p className="mt-4 text-gray-600 text-lg">
                    See how easy it is to report waste and make a difference.
                </p>

            </div>

            {/* Cards */}

            <div className="mt-16">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

                    {steps.map((step, index) => (

                        <div
                            key={step.id}
                            className="relative bg-white rounded-3xl border border-gray-200 shadow-md p-7 hover:shadow-xl transition duration-300"
                        >

                            {/* Number */}

                            <div className="absolute -top-5 left-1/2 -translate-x-1/2">

                                <div className="w-12 h-12 rounded-full bg-green-700 text-white font-bold flex items-center justify-center">

                                    {step.id}

                                </div>

                            </div>

                            {/* Icon */}

                            <div className="mt-8 flex justify-center">

                                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-5xl">

                                    {step.icon}

                                </div>

                            </div>

                            {/* Title */}

                            <h3 className="mt-8 text-2xl font-bold text-center text-green-700">

                                {step.title}

                            </h3>

                            {/* Description */}

                            <p className="mt-4 text-center text-gray-600 leading-8">

                                {step.desc}

                            </p>

                            {/* Arrow */}

                            {index !== steps.length - 1 && (

                                <div className="hidden lg:flex absolute top-1/2 -right-6 -translate-y-1/2 text-green-700 text-3xl">

                                    <FaArrowRight />

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default StepProcess;