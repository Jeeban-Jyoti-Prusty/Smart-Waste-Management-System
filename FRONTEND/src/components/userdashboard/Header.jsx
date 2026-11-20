import { Menu, Bell, UserCircle, } from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const Header = ({ setSidebarOpen }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const getProfile = async () => {

        try {

            const response = await api.get("/auth/profile");
            setUser(response.data.user);

        } catch (error) {

            console.log(error.response?.data?.message || error.message);

        }

    };

    useEffect(() => {

        getProfile();

    }, []);

    return (

        <header className="fixed top-0 left-0 lg:left-56 right-0 h-20 bg-white border-b shadow-sm flex justify-between items-center px-5 lg:px-8 z-30">

            <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
            >
                <Menu size={30} />
            </button>

            <div className="hidden lg:block">

                <h2 className="text-2xl font-bold">
                    Dashboard
                </h2>

            </div>

            <div className="flex items-center gap-5">

                <Bell />

                <div onClick={() => navigate("/profile")} className="flex items-center gap-2 cursor-pointer">

                    {
                        user?.profileImage ? (

                            <img
                                src={user.profileImage}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover border"
                            />

                        ) : (

                            <UserCircle size={38} />

                        )
                    }

                    <div className="hidden sm:block">

                        <p className="font-semibold">
                            {user?.fullName || "Loading..."}
                        </p>

                    </div>

                </div>

            </div>

        </header>

    );
};

export default Header;