
import { useNavigate } from "react-router-dom";
import DustbinBanner from "../../assets/DustbinBanner.png";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{ backgroundImage: `url(${DustbinBanner})` }}
            className="min-h-screen w-full bg-cover bg-center flex items-center px-5 sm:px-8 lg:px-[5%]"
        >
            <div className="w-full lg:w-1/2">
                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-tight">
                    Together We Can
                    <br />
                    Keep Our City
                    <br />
                    <span className="text-green-700">
                        Clean & Green
                    </span>
                </h1>

                <p className="mt-5 text-base sm:text-lg lg:text-[1.5rem] leading-relaxed">
                    Report Waste, track Status and help build a
                    <br className="hidden sm:block" />
                    cleaner and healthier environment for everyone.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <button
                        onClick={() => navigate("/login")}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                        Report Waste
                    </button>

                    <button className="border-2 border-green-500/50 hover:bg-green-600 hover:text-white transition-all duration-300 rounded-md px-6 py-3 font-semibold cursor-pointer">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
