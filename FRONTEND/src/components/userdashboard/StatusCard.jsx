import React from "react";

const StatusCard = ({ icon, title, count, bgColor }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">

            <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${bgColor}`}
            >
                {icon}
            </div>

            <p className="text-gray-500 mt-5">
                {title}
            </p>

            <h2 className="text-3xl font-bold mt-1">
                {count}
            </h2>

        </div>
    );
};

export default StatusCard;