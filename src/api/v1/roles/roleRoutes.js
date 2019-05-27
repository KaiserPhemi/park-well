// third-party libraries
const express = require("express");

// router
const roleRouter = express.Router();

// controller
const roleController = require("./roleController");

// routes
roleRouter
  .route("/")
  .get(roleController.getAllRoles)
  .post(roleController.createRole);

roleRouter
  .route("/:id")
  .get(roleController.getRole)
  .put(roleController.updateRole)
  .delete(roleController.deleteRole);

module.exports = roleRouter;
