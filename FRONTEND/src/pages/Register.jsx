import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FaUserPlus, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Register = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { fullName, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post("/auth/register",
        {
          fullName,
          email,
          password,
          confirmPassword
        }
      );

      console.log(response.data);

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      if (response.data.success) {
        navigate("/login");
      }

    } catch (error) {

      console.log(error.response?.data?.message || error.message);
    }

  };

  return (

    <div className="h-screen bg-gray-100 flex items-center justify-center px-5 py-10 ">

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


      <div className="bg-white w-108 h-auto rounded-2xl shadow-xl p-7">

        {/* Logo */}
        <div className="flex flex-col items-center">

          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
            <FaUserPlus className="text-white text-4xl" />
          </div>

          <h1 className="text-4xl font-bold mt-3">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join us in keeping our city clean
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleRegister}
          className="mt-5 flex flex-col gap-3"
        >

          {/* Full Name */}

          <div>
            <label className="font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md px-4 py-3 mt-1 outline-none focus:border-green-600"
            />
          </div>

          {/* Email */}

          <div>
            <label className="font-semibold ">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-4 py-3 mt-1 outline-none focus:border-green-600"
            />
          </div>

          {/* Password */}

          <div>
            <label className="font-semibold">
              Password
            </label>

            <div className="relative mt-1">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full border border-gray-300 rounded-md px-4 py-3 pr-12 outline-none focus:border-green-600"
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
          </div>

          {/* Confirm Password */}

          <div>
            <label className="font-semibold">
              Confirm Password
            </label>

            <div className="relative mt-1">

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full border border-gray-300 rounded-md px-4 py-3 pr-12 outline-none focus:border-green-600"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {
                  showConfirmPassword
                    ? <IoEyeOutline className="text-xl text-gray-500 cursor-pointer" />
                    : <IoEyeOffOutline className="text-xl text-gray-500 cursor-pointer" />
                }
              </button>

            </div>
          </div>

          {/* Button */}

          <button
            type="submit"

            className="mt-2 bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-lg cursor-pointer"
          >
            Register
          </button>

        </form>

        {/* Login */}

        <p className="text-center mt-4 text-gray-600">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 font-semibold cursor-pointer ml-1">
            Login
          </span>
        </p>

      </div>

    </div>
  );
};

export default Register;