import React from "react";
import { Lightbulb } from "lucide-react";

const TipsCard = () => {

    return (

        <div className="bg-green-100 rounded-xl p-6">

            <div className="flex items-center gap-2 mb-4">

                <Lightbulb className="text-green-700" />

                <h2 className="text-xl font-bold">
                    Tips
                </h2>

            </div>

            <ul className="space-y-3 text-gray-700 list-disc pl-5">

                <li>Provide a clear description.</li>

                <li>Upload a clear image.</li>

                <li>Select the correct waste type.</li>

                <li>Provide the exact location.</li>

            </ul>

        </div>

    );

};

export default TipsCard;