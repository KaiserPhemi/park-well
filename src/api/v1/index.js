// third-party libraries
const express = require("express");

// routers
const roleRouter = require("./roles/roleRoutes");
const userRouter = require("./users/userRoutes");

// main app router
const appRouter = express.Router();

// routes

// mount routes
appRouter.use("/users", userRouter);
appRouter.use("/roles", roleRouter);

module.exports = appRouter;
