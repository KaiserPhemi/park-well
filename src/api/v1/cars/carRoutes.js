// third-party libraries
const express = require("express");

// controllers
const carController = require("./carController");

// router
const carRouter = express.Router();

// routes
carRouter
  .route("/")
  .get(carController.getAllCars)
  .post(carController.registerCar);

carRouter
  .route("/:id")
  .get(carController.getCar)
  .put()
  .delete();

module.exports = carRouter;
