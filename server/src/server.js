const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("./config"); // Connect MongoDB inside config.js

const authRouter = require("./Router/auth");
const leaveRouter = require("./Router/leave");
const employeeRoutes = require("./Router/employee");
const userRouter = require("./Router/User");

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Welcome to My Leave Management System"));

app.use("/api", authRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/employees", employeeRoutes);
app.use("/api/user", userRouter);

app.listen(port, () => console.log(`My Leave Management Server is running on port ${port}`));
