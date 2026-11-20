const jwt = require("jsonwebtoken");


// Middleware for AuthAdmin
async function authAdmin(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin") {
            return res.status(403).json({
                message: "Access Denied"
            })
        }

        req.user = decoded;

        next();


    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Unauthorized"
        })

    }

}

// Middleware for AuthUser
async function authUser(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "user") {
            return res.status(403).json({
                message: "Access Denied"
            })
        }

        req.user = decoded;

        next()


    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" })
    }

}

// Middleware for Auth User or Admin
async function authAny(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        console.log("JWT ERROR:", error);

        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}

module.exports = { authAdmin, authUser, authAny };