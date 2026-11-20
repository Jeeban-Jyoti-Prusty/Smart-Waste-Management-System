import React from "react";
import {
    FaClipboardList,
    FaMapMarkerAlt,
    FaChartBar,
    FaLeaf,
} from "react-icons/fa";

const features = [
    {
        icon: <FaClipboardList />,
        title: "Easy Reporting",
        description:
            "Report waste in your area with location and images in just a few clicks.",
    },
    {
        icon: <FaMapMarkerAlt />,
        title: "Live Location",
        description:
            "Pinpoint the exact location of waste for faster and accurate resolution.",
    },
    {
        icon: <FaChartBar />,
        title: "Track Status",
        description:
            "Track the status of your reported issues in real-time.",
    },
    {
        icon: <FaLeaf />,
        title: "Better Environment",
        description:
            "Your action today leads to a cleaner, greener and healthier tomorrow.",
    },
];

const WhyChoose = () => {
    return (
        <section className="w-full bg-white py-12 px-5 sm:px-8 lg:px-[5%] ">

            {/* Heading */}

            <div className="text-center">

                <h2 className="text-3xl sm:text-4xl font-bold">
                    Why Choose <span className="text-green-700">EcoWaste?</span>
                </h2>

                <div className="w-14 h-1 bg-green-600 rounded-full mx-auto mt-4"></div>

            </div>

            {/* Cards */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

                {features.map((item, index) => (

                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-8 text-center"
                    >

                        {/* Icon */}

                        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto">

                            <div className="text-4xl text-green-600">
                                {item.icon}
                            </div>

                        </div>

                        {/* Title */}

                        <h3 className="mt-6 text-2xl font-semibold text-green-700">
                            {item.title}
                        </h3>

                        {/* Description */}

                        <p className="mt-5 text-gray-600 leading-8">
                            {item.description}
                        </p>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default WhyChoose;