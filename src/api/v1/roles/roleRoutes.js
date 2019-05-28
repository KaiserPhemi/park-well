// third-party libraries
const express = require("express");

// middleware
const auth = require("../../../middlewares/auth");

// router
const roleRouter = express.Router();

// controller
const roleController = require("./roleController");

// routes
roleRouter
  .route("/")
  .get(auth.verifyToken, roleController.getAllRoles)
  .post(auth.verifyToken, roleController.createRole);

roleRouter
  .route("/:id")
  .get(auth.verifyToken, roleController.getRole)
  .put(auth.verifyToken, roleController.updateRole)
  .delete(auth.verifyToken, roleController.deleteRole);

module.exports = roleRouter;
