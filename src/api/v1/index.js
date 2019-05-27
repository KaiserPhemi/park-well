// third-party libraries
const express = require("express");

// routers
const roleRouter = require("./roles/roleRoutes");
const userRouter = require("./users/userRoutes");
const authRouter = require("./auth/authRoutes");
const carRouter = require("./cars/carRoutes");

// main app router
const appRouter = express.Router();

// mount routes
appRouter.use("/users", userRouter);
appRouter.use("/roles", roleRouter);
appRouter.use("/auth", authRouter);
appRouter.use("/cars", carRouter);
// appRouter.use('/spaces', carSpaceRouter);
// appRouter.use('/activities', parkingActivityRouter)

module.exports = appRouter;
