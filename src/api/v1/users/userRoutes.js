// third-party libraries
const express = require("express");

// router
const userRouter = express.Router();

// controller
const userController = require("./userController");

// routes
userRouter.route("/").get(userController.getAllUsers);

module.exports = userRouter;
