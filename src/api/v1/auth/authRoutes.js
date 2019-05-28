// third-party libraries
const express = require("express");

// router
const authRouter = express.Router();

// controller
const authController = require("./authController");

// routes
authRouter.route("/login").post(authController.login);
authRouter.route("/logout").post(authController.logout);

module.exports = authRouter;
