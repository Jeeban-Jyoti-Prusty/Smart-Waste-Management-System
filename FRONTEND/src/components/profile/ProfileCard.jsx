import React, { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";
import api from "../../api/api";
import { useRef } from "react";

const ProfileCard = () => {

    const [user, setUser] = useState(null);
    const fileInputRef = useRef(null);

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

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const response = await api.put("/auth/update-profile", {
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                address: user.address,
            });

            setUser(response.data.user);

            console.log(response.data);

        } catch (error) {

            console.log(error.response?.data?.message || error.message);

        }

    };

    const handleImageChange = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();

        formData.append("profileImage", file);
        formData.append("fullName", user.fullName);
        formData.append("email", user.email);
        formData.append("phone", user.phone);
        formData.append("address", user.address);

        try {

            const response = await api.put(
                "/auth/update-profile",
                formData
            );

            console.log(response.data);

            setUser(response.data.user);

        } catch (error) {

            console.log(error.response?.data?.message || error.message);

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-md p-5 sm:p-8">

            {/* Heading */}

            <h1 className="text-2xl sm:text-3xl font-bold mb-8">

                My Profile

            </h1>

            {/* Profile */}

            <div className="flex flex-col items-center mb-10">

                {
                    user?.profileImage ? (

                        <img
                            src={user.profileImage}
                            alt="Profile"
                            className="w-30 h-30 rounded-full object-cover border-2 border-green-600"
                        />

                    ) : (

                        <UserCircle
                            size={120}
                            className="text-gray-500"
                        />

                    )
                }

                <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="mt-4 text-green-700 font-semibold hover:underline"
                >
                    Change Profile Photo
                </button>

                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                />

            </div>

            {/* Form */}

            <form onSubmit={handleUpdate} className="space-y-6">

                {/* Name */}

                <div>

                    <label className="block font-semibold mb-2">

                        Full Name

                    </label>

                    <input
                        type="text"
                        value={user?.fullName || ""}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                fullName: e.target.value,
                            })
                        }
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-green-600"
                    />

                </div>

                {/* Email */}

                <div>

                    <label className="block font-semibold mb-2">

                        Email

                    </label>

                    <input
                        type="email"
                        value={user?.email || ""}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                email: e.target.value,
                            })
                        }
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-green-600"
                    />

                </div>

                {/* Phone */}

                <div>

                    <label className="block font-semibold mb-2">

                        Phone Number

                    </label>

                    <input
                        type="tel"
                        value={user?.phone || ""}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                phone: e.target.value,
                            })
                        }
                        placeholder="Enter your phone number"
                        className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-green-600"
                    />

                </div>

                {/* Address */}

                <div>

                    <label className="block font-semibold mb-2">

                        Address

                    </label>

                    <textarea
                        rows="4"
                        value={user?.address || ""}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                address: e.target.value,
                            })
                        }
                        placeholder="Enter your address"
                        className="w-full border border-gray-300 rounded-xl p-3 resize-none outline-none focus:border-green-600"
                    />

                </div>

                {/* Button */}

                <button
                    type="submit"
                    className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-xl transition"
                >

                    Save Changes

                </button>

            </form>

        </div>

    );
};

export default ProfileCard;