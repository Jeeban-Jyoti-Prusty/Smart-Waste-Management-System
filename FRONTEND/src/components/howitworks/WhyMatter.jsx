import React from "react";
import {
    FaShieldAlt,
    FaLeaf,
    FaUsers,
    FaChartBar,
} from "react-icons/fa";

const benefits = [
    {
        icon: <FaShieldAlt />,
        title: "Better Accountability",
        desc: "Ensures responsible authorities take timely action.",
    },
    {
        icon: <FaLeaf />,
        title: "Cleaner Environment",
        desc: "Quick action leads to cleaner streets and a healthier city.",
    },
    {
        icon: <FaUsers />,
        title: "Community Participation",
        desc: "Everyone can contribute to a cleaner and greener surrounding.",
    },
    {
        icon: <FaChartBar />,
        title: "Transparent Process",
        desc: "You can track your report and stay updated at every step.",
    },
];

const WhyMatter = () => {
    return (
        <section className="w-full bg-white py-8 px-5 sm:px-8 lg:px-[5%]">

            <div className="bg-green-50 rounded-3xl shadow-sm border border-green-100 p-8 lg:p-12">

                {/* Heading */}

                <div className="text-center">

                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Why This Process{" "}
                        <span className="text-green-700">Matters?</span>
                    </h2>

                    <div className="w-16 h-1 bg-green-700 rounded-full mx-auto mt-4"></div>

                </div>

                {/* Items */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-14">

                    {benefits.map((item, index) => (

                        <div
                            key={index}
                            className={`flex flex-col items-center text-center px-8 py-4
              ${index !== benefits.length - 1
                                    ? "lg:border-r border-gray-300"
                                    : ""
                                }`}
                        >

                            {/* Icon */}

                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">

                                <div className="text-4xl text-green-700">
                                    {item.icon}
                                </div>

                            </div>

                            {/* Title */}

                            <h3 className="mt-6 text-2xl font-bold text-green-700">
                                {item.title}
                            </h3>

                            {/* Description */}

                            <p className="mt-4 text-gray-600 leading-8">
                                {item.desc}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default WhyMatter;