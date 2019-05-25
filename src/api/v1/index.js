// third-party libraries
const express = require("express");

// routers
const roleRouter = require("./roles/roleRoutes");

// main app router
const appRouter = express.Router();

// routes

// mount routes
// appRouter.use("/users", usersRoutes);
appRouter.use("/roles", roleRouter);
