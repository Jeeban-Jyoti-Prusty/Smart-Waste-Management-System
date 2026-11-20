const express = require("express");
const reportController = require("../controllers/report.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage, });

const reportRouter = express.Router();


// ------------USER KE LIYE------------------------


// Create Report
reportRouter.post("/create-report", authMiddleware.authUser, upload.single("image"), reportController.createReport);

// Get My Reports
reportRouter.get("/my-report", authMiddleware.authUser, reportController.getMyReports);

// Get Single Report
reportRouter.get("/get-single-report/:id", authMiddleware.authUser, reportController.getSingleReport);

// user Dashboard Stats
reportRouter.get("/my-dashboard-stats", authMiddleware.authUser, reportController.userDashboardStats);



// -----------------ADMIN KE LIYE-------------------


// Get all Reports
reportRouter.get("/get-all-reports", authMiddleware.authAdmin, reportController.getAllReports);

// Get Single Report
reportRouter.get("/admin-get-single-report/:id", authMiddleware.authAdmin, reportController.adminGetSingleReport);

// Delete Report
reportRouter.delete("/delete-report/:id", authMiddleware.authAdmin, reportController.deleteReport);

// Update status
reportRouter.patch("/update-status/:id", authMiddleware.authAdmin, reportController.updateReportStatus);

// Admin Dashboard Stats
reportRouter.get("/dashboard-stats", authMiddleware.authAdmin, reportController.adminDashboardStats);


module.exports = reportRouter;