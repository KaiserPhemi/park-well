// third-party libraries
const express = require("express");

// middlewares
const auth = require("../../../middlewares/auth");

// controller
const parkingSpaceController = require("./parkingSpaceController");

// router
const parkingSpaceRouter = express.Router();

// routes
parkingSpaceRouter
  .route("/")
  .get(auth.verifyToken, parkingSpaceController.getParkingSpaces)
  .post(auth.verifyToken, parkingSpaceController.addParkingSpace);

parkingSpaceRouter
  .route("/:id")
  .put(auth.verifyToken, parkingSpaceController.updateParkingSpace);

module.exports = parkingSpaceRouter;
