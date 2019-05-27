// third-party libraries
const express = require("express");

// routers
const roleRouter = require("./roles/roleRoutes");
const userRouter = require("./users/userRoutes");
const authRouter = require("./auth/authRoutes");

// main app router
const appRouter = express.Router();

// mount routes
appRouter.use("/users", userRouter);
appRouter.use("/roles", roleRouter);
appRouter.use("/auth", authRouter);

module.exports = appRouter;
