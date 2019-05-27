// third-party libraries
const express = require("express");

// controller
const parkingSpaceController = require("./parkingSpaceController");

// router
const parkingSpaceRouter = express.Router();

// routes
parkingSpaceRouter.route("/").get(parkingSpaceController.getParkingSpaces);

module.exports = parkingSpaceRouter;
