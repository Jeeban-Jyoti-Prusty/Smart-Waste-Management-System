const express = require("express");
const userController = require("../controllers/user.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");

const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {

        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }

    },
});

const userRouter = express.Router();


// Register User
userRouter.post("/register", userController.registeruser);

// Login User
userRouter.post("/login", userController.loginuser);

// Logout User
userRouter.get("/logout", userController.logoutuser);

// Get Profile
userRouter.get("/profile", authMiddleware.authAny, userController.getProfile);

// Update Profile
userRouter.put("/update-profile", authMiddleware.authAny, upload.single("profileImage"), userController.updateProfile);

// Auth Status
userRouter.get("/status", userController.getAuthStatus);


module.exports = userRouter;