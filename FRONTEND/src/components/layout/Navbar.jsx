import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaLeaf } from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-gray-100 border-b border-black/10 shadow-sm z-50 p-[20px_5%]">

            {/* Main Navbar */}
            <div className=" flex items-center justify-between">

                {/* Logo */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold md:mb-1 text-green-600 flex justify-center  gap-2 items-center">
                        <FaLeaf />
                         EcoWaste</h1>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-5 lg:gap-8">

                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-green-600 font-semibold"
                                    : "font-semibold hover:text-green-600 duration-300"
                            }
                        >
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-green-600 font-semibold"
                                    : "font-semibold hover:text-green-600 duration-300"
                            }
                        >
                            About
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/how-it-works"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-green-600 font-semibold"
                                    : "font-semibold hover:text-green-600 duration-300"
                            }
                        >
                            How it Works
                        </NavLink>
                    </li>

                </ul>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-3">

                    <button
                        onClick={() => navigate("/login")}
                        className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-5 py-2 rounded-md font-semibold transition-all duration-300 cursor-pointer"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/register")}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-semibold transition-all duration-300 cursor-pointer"
                    >
                        Register
                    </button>

                </div>

                {/* Mobile Menu Icon */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden"
                >
                    {menuOpen ? (
                        <HiX className="text-3xl" />
                    ) : (
                        <HiMenuAlt3 className="text-3xl" />
                    )}
                </button>

            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg">

                    <ul className="flex flex-col items-center gap-6 py-8">

                        <li onClick={() => setMenuOpen(false)}>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-green-600 font-semibold"
                                        : "font-semibold hover:text-green-600 transition-colors duration-300"
                                }
                            >
                                Home
                            </NavLink>
                        </li>

                        <li onClick={() => setMenuOpen(false)}>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-green-600 font-semibold"
                                        : "font-semibold hover:text-green-600 transition-colors duration-300"
                                }
                            >
                                About
                            </NavLink>
                        </li>

                        <li onClick={() => setMenuOpen(false)}>
                            <NavLink
                                to="/how-it-works"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-green-600 font-semibold"
                                        : "font-semibold hover:text-green-600 transition-colors duration-300"
                                }
                            >
                                How it Works
                            </NavLink>
                        </li>


                        <button
                            onClick={() => {
                                navigate("/login");
                                setMenuOpen(false);
                            }}
                            className="w-44 border-2 border-green-600 text-green-600 py-2 rounded-md font-semibold hover:bg-green-600 hover:text-white transition-all"
                        >
                            Login
                        </button>

                        <button
                            onClick={() => {
                                navigate("/register");
                                setMenuOpen(false);
                            }}
                            className="w-44 bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition-all"
                        >
                            Register
                        </button>

                    </ul>

                </div>
            )}
        </nav>
    );
};

export default Navbar;