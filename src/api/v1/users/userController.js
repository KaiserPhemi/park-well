// database model
const db = require("../../../../models");

const userController = {
  getAllUsers(req, res) {
    res.send({
      message: "we get all users"
    });
  }
};

module.exports = userController;
