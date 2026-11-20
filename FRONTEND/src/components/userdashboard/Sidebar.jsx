import React from "react";
import {
    LayoutDashboard,
    FileText,
    ClipboardList,
    User,
    LogOut,
    X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import api from "../../api/api";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

    const navigate = useNavigate();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <LayoutDashboard size={20} />,
        },
        {
            name: "Report Waste",
            path: "/report-waste",
            icon: <FileText size={20} />,
        },
        {
            name: "My Reports",
            path: "/my-reports",
            icon: <ClipboardList size={20} />,
        },
        {
            name: "Profile",
            path: "/profile",
            icon: <User size={20} />,
        },
    ];

    const handleLogout = async () => {

        try {

            const response = await api.get("/auth/logout");

            console.log(response.data);

            navigate("/", { replace: true });

        } catch (error) {

            console.log(error.response?.data?.message || error.message);

        }

    };

    return (

        <>
            {/* Overlay */}

            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                ></div>
            )}

            <aside
                className={`fixed top-0 left-0 h-screen w-56 bg-white border-r z-50
                transform transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0`}
            >

                {/* Logo */}

                <div className="h-20 border-b flex items-center justify-between px-6">

                    <Link
                        to="/"
                        className="text-3xl font-bold text-green-700"
                    >
                        EcoWaste
                    </Link>

                    <button
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X />
                    </button>

                </div>

                {/* Menu */}

                <nav className="px-4 py-6">

                    {menuItems.map((item) => (

                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg mb-3 transition
                                ${isActive
                                    ? "bg-green-600 text-white"
                                    : "hover:bg-green-100"
                                }`
                            }
                        >

                            {item.icon}

                            {item.name}

                        </NavLink>

                    ))}

                </nav>

                <div className="absolute bottom-0 w-full border-t p-4">

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-100 hover:text-red-600"
                    >

                        <LogOut />

                        Logout

                    </button>

                </div>

            </aside>

        </>
    );
};

export default Sidebar;