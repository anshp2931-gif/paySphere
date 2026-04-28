const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const employeeRoutes = require("./routes/employee.routes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/employees", employeeRoutes);

module.exports = app;
