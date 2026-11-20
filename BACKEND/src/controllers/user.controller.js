const userModel = require("../models/user.model.js");
const cloudinary = require("../config/cloudinary.js");
const streamifier = require("streamifier");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// REGISTER USER
async function registeruser(req, res) {

    try {

        const { fullName, email, password, confirmPassword, role = "user" } = req.body;

        const isUserAlreadyExist = await userModel.findOne({ email })

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        }

        if (isUserAlreadyExist) {
            return res.status(409).json({
                Message: "User already exists"
            });
        }

        const hash = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            fullName,
            email,
            password: hash,
            role
        })

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            Message: "User Registered Sucessfully",
            user: userResponse
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message || error,
        });

    }

};

// LOGIN USER
async function loginuser(req, res) {

    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email }
        )

        if (!user) {
            return res.status(401).json({
                message: "User doesn't exixt"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Username or Password"
            })
        };

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        res.status(200).json({
            "success": true,
            message: "Login Sucessfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
        })
    }


};

// LOGOUT USER
async function logoutuser(req, res) {

    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.status(200).json({
            message: "Logout sucessfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
        })
    }

};

// GET PROFILE
async function getProfile(req, res) {
    try {

        const user = await userModel.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
        });
    }
};

// UPDATE PROFILE
async function updateProfile(req, res) {
    try {

        const { fullName, email, phone, address } = req.body;

        // Find Logged-in User
        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check Duplicate Email
        if (email) {
            const existingUser = await userModel.findOne({
                email: email.toLowerCase(),
            });

            if (
                existingUser &&
                existingUser._id.toString() !== req.user.id
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists",
                });
            }
        }

        // Update User Details
        user.fullName = fullName || user.fullName;
        user.email = email ? email.toLowerCase() : user.email;
        user.phone = phone || user.phone;
        user.address = address || user.address;

        // Upload Profile Image
        if (req.file) {

            const uploadImage = () =>
                new Promise((resolve, reject) => {

                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "Profile",
                        },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );

                    streamifier
                        .createReadStream(req.file.buffer)
                        .pipe(stream);
                });

            const result = await uploadImage();

            user.profileImage = result.secure_url;
        }

        // Save User
        await user.save();

        // Fetch Updated User Without Password
        const updatedUser = await userModel
            .findById(user._id)
            .select("-password");

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}

//GET AUTHSTATUS
async function getAuthStatus(req, res) {

    const token = req.cookies.token;

    // User is not logged in
    if (!token) {
        return res.status(200).json({
            isAuthenticated: false,
            user: null
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        return res.status(200).json({
            isAuthenticated: true,
            user: decoded
        });

    } catch (error) {

        return res.status(200).json({
            isAuthenticated: false,
            user: null
        });

    }
}


module.exports = { registeruser, loginuser, logoutuser, getProfile, updateProfile, getAuthStatus };