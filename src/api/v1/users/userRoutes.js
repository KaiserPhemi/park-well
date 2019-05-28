// third-party libraries
const express = require("express");

// middleware
const auth = require("../../../middlewares/auth");

// controller
const userController = require("./userController");

// router
const userRouter = express.Router();

// routes
userRouter
  .route("/")
  .get(auth.verifyToken, userController.getAllUsers)
  .post(auth.verifyToken, userController.createUser);

userRouter
  .route("/:id")
  .get(auth.verifyToken, userController.getUser)
  .put(auth.verifyToken, userController.updateUser)
  .delete(auth.verifyToken, userController.deleteUser);

module.exports = userRouter;
