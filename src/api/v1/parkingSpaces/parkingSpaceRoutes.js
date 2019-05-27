// third-party libraries
const express = require("express");

// controller
const parkingSpaceController = require("./parkingSpaceController");

// router
const parkingSpaceRouter = express.Router();

// routes
parkingSpaceRouter
  .route("/")
  .get(parkingSpaceController.getParkingSpaces)
  .post(parkingSpaceController.addParkingSpace);

parkingSpaceRouter.route("/:id").put(parkingSpaceController.updateParkingSpace);

module.exports = parkingSpaceRouter;
