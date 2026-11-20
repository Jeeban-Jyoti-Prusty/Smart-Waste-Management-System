import React from 'react'
import { FaLeaf } from "react-icons/fa";
import Dustbin from "../../assets/Dustbin2.png";
import { useNavigate } from 'react-router-dom';

const WorksHero = () => {

    const navigate = useNavigate();

    return (
        <section className="h-screen w-full flex items-center bg-white px-5 sm:px-8 lg:px-[5%]">

            <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12">

                {/* Left Side */}
                <div className="w-full lg:w-1/2">

                    {/* Badge */}
                    <div className="inline-block border border-green-600 rounded-full px-5 py-2">

                        <span className="text-green-700 text-sm font-semibold">HOW IT WORKS</span>

                    </div>

                    {/* Heading */}

                    <h1 className="mt-8 text-4xl sm:text-5xl lg:text-[3.8rem] font-bold leading-tight">

                        How{" "}

                        <span className="text-green-700">
                            EcoWaste
                        </span>

                        <br />
                        Works

                    </h1>

                    {/* Paragraph */}

                    <p className="mt-5 text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                        EcoWaste makes Waste management simple and efficient.Follow these easy steps to report waste and help build a cleaner and greener environment.

                    </p>

                    {/* Button */}

                    <button
                        onClick={() => navigate("/login")}
                        className="mt-8 flex items-center gap-3 bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transition-all duration-300 cursor-pointer">

                        <FaLeaf />

                        Report Waste Now

                    </button>

                </div>

                {/* Right Side */}

                <div className="w-full lg:w-1/2 flex justify-center">

                    <img
                        src={Dustbin}
                        alt="Dustbin"
                        className="w-full  max-w-2xl"
                    />

                </div>

            </div>

        </section>
    )
}

export default WorksHero;