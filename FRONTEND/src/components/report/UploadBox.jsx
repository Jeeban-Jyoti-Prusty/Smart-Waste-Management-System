import React, { useRef } from "react";
import { UploadCloud } from "lucide-react";

const UploadBox = ({ reportData, setReportData }) => {

    const fileInputRef = useRef(null);

    // Handle Image Selection
    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        // Validate Image Type
        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            return;
        }

        // Validate Image Size (5 MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("Image size should be less than 5 MB.");
            return;
        }

        setReportData({
            ...reportData,
            image: file,
        });

    };

    // Remove Selected Image
    const handleRemoveImage = (e) => {

        e.stopPropagation();

        setReportData({
            ...reportData,
            image: null,
        });

        fileInputRef.current.value = "";

    };

    return (

        <div>

            <label className="block mb-2 font-semibold">
                Upload Image
            </label>

            <div
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed rounded-xl p-6 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition"
            >

                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                />

                {
                    reportData.image ? (

                        <>

                            <img
                                src={URL.createObjectURL(reportData.image)}
                                alt="Preview"
                                className="w-48 h-48 rounded-xl object-cover shadow"
                            />

                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="mt-4 text-red-600 font-semibold hover:underline"
                            >
                                Remove Image
                            </button>

                        </>

                    ) : (

                        <>

                            <UploadCloud
                                size={45}
                                className="text-gray-400 mb-3"
                            />

                            <p className="font-medium">
                                Click to upload image
                            </p>

                            <p className="text-sm text-gray-400 mt-1">
                                JPG, PNG, JPEG (Max 5 MB)
                            </p>

                        </>

                    )
                }

            </div>

        </div>

    );

};

export default UploadBox;