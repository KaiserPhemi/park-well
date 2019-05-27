// third-party libraries
const express = require("express");

// controllers
const carController = require("./carController");

// router
const carRouter = express.Router();

// routes
carRouter.route("/").get(carController.getAllCars);

module.exports = carRouter;
