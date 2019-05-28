// third-party libraries
const express = require("express");

// middlewares
const auth = require("../../../middlewares/auth");

// controller
const activityController = require("./activityController");

// router
const activityRouter = express.Router();

// routes
activityRouter
  .route("/")
  .get(auth.verifyToken, activityController.getActivities)
  .post(auth.verifyToken, activityController.createActivity);

activityRouter
  .route("/:id")
  .put(auth.verifyToken, activityController.updateActivity);

module.exports = activityRouter;
