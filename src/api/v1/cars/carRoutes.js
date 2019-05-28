// third-party libraries
const express = require("express");

// controllers
const carController = require("./carController");

// middleswares
const auth = require("../../../middlewares/auth");

// router
const carRouter = express.Router();

// routes
carRouter
  .route("/")
  .get(auth.verifyToken, carController.getAllCars)
  .post(auth.verifyToken, carController.registerCar);

carRouter
  .route("/:id")
  .get(auth.verifyToken, carController.getCar)
  .put(auth.verifyToken, carController.updateCarDetails)
  .delete(auth.verifyToken, carController.deleteCar);

module.exports = carRouter;
