import React, { useEffect, useState } from "react";
import {
    Menu,
    UserCircle,
} from "lucide-react";
import api from "../../api/api";

const AdminHeader = ({ setSidebarOpen }) => {

    const [admin, setAdmin] = useState(null);

    useEffect(() => {

        const getAdminProfile = async () => {

            try {

                const response = await api.get("/auth/profile");

                console.log("Admin Profile:", response.data);

                setAdmin(response.data.user);

            } catch (error) {

                console.log(
                    error.response?.data?.message ||
                    error.message
                );

            }

        };

        getAdminProfile();

    }, []);

    return (

        <header className="fixed top-0 left-0 lg:left-56 right-0 h-20 bg-white border-b flex justify-between items-center px-5 lg:px-8 z-30">

            {/* Left Side */}

            <div className="flex items-center gap-4">

                {/* Mobile Menu */}

                <button
                    className="lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu size={30} />
                </button>

                {/* Desktop Title */}

                <div className="hidden lg:block">

                    <h1 className="text-2xl font-bold">
                        Admin Dashboard
                    </h1>

                </div>

            </div>

            {/* Right Side */}

            <div className="flex items-center gap-3 cursor-pointer">

                {admin?.profileImage ? (
                    <img
                        src={admin.profileImage}
                        alt={admin.fullName}
                        className="w-10 h-10 rounded-full object-cover border"
                    />
                ) : (
                    <UserCircle
                        size={38}
                        className="text-gray-600"
                    />
                )}

                <div className="hidden sm:block">

                    <p className="font-semibold">
                        {admin?.fullName || "Admin"}
                    </p>

                </div>

            </div>

        </header>

    );
};

export default AdminHeader;