const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/user.routes.js");
const reportRouter = require("./routes/report.routes.js");

const app = express();

// ✅ CORS
const allowedOrigins = [
    "http://localhost:5173",
    "https://smart-waste-management-system-vert.vercel.app"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes prefix
app.use("/api/auth", userRouter);
app.use("/api/report", reportRouter);

module.exports = app;