const reportModel = require("../models/report.model.js");
const cloudinary = require("../config/cloudinary.js");
const streamifier = require("streamifier");
const mongoose = require("mongoose");


// -------------USER--------------

// CREATE REPORT
async function createReport(req, res) {
    try {

        const { title, description, wasteType, location } = req.body;

        if (!title || !description || !wasteType || !location) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: "Please upload the image"
            });
        }

        const uploadImage = () =>
            new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "Garbage",
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );

                streamifier.createReadStream(file.buffer).pipe(stream);
            });

        const result = await uploadImage();

        const report = await reportModel.create({
            title,
            description,
            wasteType,
            location,
            image: result.secure_url,
            user: req.user.id
        })

        res.status(201).json({
            message: "Report Created Sucessfully",
            report
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }

};

// GET MY REPORTS
async function getMyReports(req, res) {

    try {

        const userId = req.user.id;

        const reports = await reportModel.find({
            user: userId
        });

        if (reports.length === 0) {
            return res.status(200).json({
                message: "No reports found",
                reports: []
            });
        }

        res.status(200).json({
            message: "Reports fetched successfully",
            reports
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// GET SINGLE REPORTS
async function getSingleReport(req, res) {
    try {

        const { id } = req.params;

        const report = await reportModel.findById(id);

        if (!report) {
            return res.status(404).json({
                message: "Report not found"
            });
        }

        if (report.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        return res.status(200).json({
            message: "Report fetched successfully",
            report
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

// USER DASHBOARD STATS
async function userDashboardStats(req, res) {
    try {

        const totalReports = await reportModel.countDocuments({
            user: req.user.id,
        });

        const pendingReports = await reportModel.countDocuments({
            user: req.user.id,
            status: "Pending",
        });

        const inProgressReports = await reportModel.countDocuments({
            user: req.user.id,
            status: "In Progress",
        });

        const resolvedReports = await reportModel.countDocuments({
            user: req.user.id,
            status: "Resolved",
        });

        return res.status(200).json({
            success: true,
            message: "User dashboard statistics fetched successfully",
            stats: {
                totalReports,
                pendingReports,
                inProgressReports,
                resolvedReports,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
        });
    }
}


// --------------ADMIN------------------

// GET ALL REPORT
async function getAllReports(req, res) {

    try {

        const reports = await reportModel
            .find()
            .populate("user", "fullName email");

        if (reports.length === 0) {

            return res.status(200).json({
                message: "No reports found",
                success: true,
                count: 0,
                reports: [],
            });

        }

        res.status(200).json({
            message: "Reports fetched successfully",
            success: true,
            count: reports.length,
            reports,
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message || error,
        });

    }

}

// GET SINGLE REPORT
async function adminGetSingleReport(req, res) {
    try {
        const { id } = req.params
        const report = await reportModel
            .findById(id)
            .populate("user", "fullName email");

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Report fetched successfully",
            report,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
        })
    }

};

// DELETE REPORT
async function deleteReport(req, res) {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Report ID",
            });
        }

        const report = await reportModel.findById(id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found",
            });
        }

        await report.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Report deleted successfully",
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
        });
    }
};

// UPDATE STATUS
async function updateReportStatus(req, res) {
    try {

        // 1. Get report id from URL
        const { id } = req.params;

        // 2. Get new status from request body
        const { status } = req.body;

        // 3. Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Report ID",
            });
        }

        // 4. Find report by ID
        const report = await reportModel.findById(id);

        // 5. Check report exists
        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found",
            });
        }

        // 6. Validate status
        const validStatus = ["Pending", "In Progress", "Resolved"];

        if (!validStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }

        // 7. Update status
        report.status = status;

        // 8. Save changes
        await report.save();

        // 9. Send response
        return res.status(200).json({
            success: true,
            message: "Report status updated successfully",
            report,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
        });
    }
}

// Admin Dashboard Stats
async function adminDashboardStats(req, res) {
    try {

        const totalReports = await reportModel.countDocuments();

        const pendingReports = await reportModel.countDocuments({
            status: "Pending",
        });

        const inProgressReports = await reportModel.countDocuments({
            status: "In Progress",
        });

        const resolvedReports = await reportModel.countDocuments({
            status: "Resolved",
        });

        return res.status(200).json({
            success: true,
            message: "Dashboard statistics fetched successfully",
            stats: {
                totalReports,
                pendingReports,
                inProgressReports,
                resolvedReports,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
        });
    }
}


module.exports = { createReport, getMyReports, getSingleReport, getAllReports, adminGetSingleReport, deleteReport, updateReportStatus, adminDashboardStats, userDashboardStats };