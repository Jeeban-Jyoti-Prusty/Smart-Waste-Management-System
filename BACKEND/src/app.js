const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/user.routes.js");
const reportRouter = require("./routes/report.routes.js");

const app = express();

// ✅ CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes prefix
app.use("/api/auth", userRouter);
app.use("/api/report", reportRouter);

module.exports = app;