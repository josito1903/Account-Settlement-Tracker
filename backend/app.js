const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const app = express();
const authMiddleware = require("./middleware/authMiddleware");
const customerRoutes = require("./routes/customerRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const settlementRoutes = require("./routes/settlementRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");
const userRoutes = require("./routes/userRoutes");



// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/settlements", settlementRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);



// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Accounts Settlement Tracker Backend Running 🚀",
    });
});

app.get("/api/profile", authMiddleware, (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
});

module.exports = app;