import React from "react";

const AdminStatusCard = ({ icon, title, count, bgColor }) => {
    return (

        <div className="bg-white rounded-xl shadow-sm p-6 w-full sm:w-full lg:w-auto">

            {/* Icon */}

            <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor}`}
            >
                {icon}
            </div>

            {/* Title */}

            <p className="text-gray-500 mt-4">
                {title}
            </p>

            {/* Count */}

            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
                {count}
            </h2>

        </div>

    );
};

export default AdminStatusCard;