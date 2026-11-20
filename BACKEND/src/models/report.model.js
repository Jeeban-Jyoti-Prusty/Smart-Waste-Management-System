const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
        },

        wasteType: {
            type: String,
            required: true,
        },

        location: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["Pending", "In Progress", "Resolved"],
            default: "Pending",
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const reportModel = mongoose.model("Report", reportSchema);


module.exports = reportModel;