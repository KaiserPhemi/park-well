// third-party libraries
const express = require("express");

// router
const userRouter = express.Router();

// controller
const userController = require("./userController");

// routes
userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

userRouter
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
