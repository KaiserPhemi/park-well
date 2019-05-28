// third-party libraries
const express = require("express");

// router
const userRouter = express.Router();

// controller
const userController = require("./userController");
const auth = require("../../../middlewares/auth");

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
