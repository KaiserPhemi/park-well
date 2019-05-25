// third-party libraries
const express = require("express");

// controller
const roleController = require("./roleController");

// router
const roleRouter = express.Router();

// routes
roleRouter.route("/").get(roleController.getAllRoles);

module.exports = roleRouter;
