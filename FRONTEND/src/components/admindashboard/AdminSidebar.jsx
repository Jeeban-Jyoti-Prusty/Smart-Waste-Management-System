import React, { useState } from "react";
import {
    LayoutDashboard,
    FileText,
    LogOut,
    X,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../../api/api";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {

        try {

            setLoading(true);

            const response = await api.get("/auth/logout");

            console.log("Logout:", response.data);

            navigate("/");

        } catch (error) {

            console.log(
                error.response?.data?.message ||
                error.message
            );

        } finally {

            setLoading(false);

        }

    };

    const menuItems = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: <LayoutDashboard size={20} />,
        },
        {
            name: "All Reports",
            path: "/admin/reports",
            icon: <FileText size={20} />,
        },
    ];

    return (
        <>
            {/* Mobile Overlay */}

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}

            <aside
                className={`
                fixed top-0 left-0 z-50
                w-56 h-screen
                bg-slate-900 text-white
                flex flex-col
                transform transition-transform duration-300

                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

                lg:translate-x-0
                `}
            >

                {/* Logo */}

                <div className="h-20 flex items-center justify-between px-6 border-b border-slate-700">

                    <Link
                        to="/"
                        className="text-2xl font-bold text-green-400"
                    >
                        EcoWaste
                    </Link>

                    {/* Close Button */}

                    <button
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={28} />
                    </button>

                </div>

                {/* Menu */}

                <nav className="flex-1 p-4">

                    {menuItems.map((item) => (

                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg mb-3 transition
                                ${isActive
                                    ? "bg-green-600 text-white"
                                    : "hover:bg-slate-800"}`
                            }
                        >

                            {item.icon}

                            <span>{item.name}</span>

                        </NavLink>

                    ))}

                </nav>

                {/* Logout */}

                <div className="p-4 border-t border-slate-700">

                    <button
                        onClick={handleLogout}
                        disabled={loading}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                    >

                        <LogOut size={20} />

                        {loading ? "Logging out..." : "Logout"}

                    </button>

                </div>

            </aside>
        </>
    );
};

export default AdminSidebar;