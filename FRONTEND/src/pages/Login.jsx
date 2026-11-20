import React, { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FaUser, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import api from "../api/api"

const Login = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();
        setError("");

        try {

            setLoading(true);
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            console.log(response);

            if (response.data.user.role === "admin") {
                setLoading(false);
                navigate("/admin/dashboard");
            } else {
                setLoading(false);
                navigate("/dashboard");
            }

        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="relative h-screen w-full bg-white flex items-center justify-center px-5 py-10">

            {/* Back Button */}

            <div className="absolute top-8 left-8">

                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md border border-gray-200 text-green-700 hover:bg-green-50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                    <FaArrowLeft />
                    Back to Home
                </button>

            </div>

            <div className="bg-white p-12 rounded-xl shadow-xl border border-black/5 w-112.5">

                {/* Header */}

                <div className="flex flex-col items-center mb-10">

                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">

                        <FaUser className="text-white text-4xl" />

                    </div>

                    <h1 className="text-4xl font-bold mt-5">
                        Welcome Back!
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to your account
                    </p>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleLogin}
                    className="flex flex-col"
                >

                    {/* Email */}

                    <label className="font-semibold">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        className="border border-gray-300 rounded-md px-4 py-2 mt-2 outline-none focus:border-green-600"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Password */}

                    <label className="font-semibold mt-5">
                        Password
                    </label>

                    <div className="relative mt-2">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 pr-12 outline-none focus:border-green-600"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                            {
                                showPassword
                                    ? <IoEyeOutline className="text-xl text-gray-500 cursor-pointer" />
                                    : <IoEyeOffOutline className="text-xl text-gray-500 cursor-pointer" />
                            }
                        </button>

                    </div>

                    {
                        error && (
                            <p className="text-red-500 text-sm mt-4 text-center">
                                {error}
                            </p>
                        )
                    }

                    {/* Login Button */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                {/* Register */}

                <p className="mt-6 text-center text-gray-600">

                    Don't have an account?

                    <span
                        onClick={() => navigate("/register")}
                        className="text-green-600 font-semibold cursor-pointer ml-1"
                    >
                        Register
                    </span>

                </p>

            </div>

        </div>
    );
};

export default Login;