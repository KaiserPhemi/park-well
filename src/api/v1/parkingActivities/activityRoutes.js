// third-party libraries
const express = require("express");

// controller
const activityController = require("./activityController");

// router
const activityRouter = express.Router();

// routes
activityRouter
  .route("/")
  .get(activityController.getActivities)
  .post(activityController.createActivity);

activityRouter.route("/:id").put(activityController.updateActivity);

module.exports = activityRouter;
