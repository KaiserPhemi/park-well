// database
const db = require("../../../../models");

// controllers
const roleController = {
  getAllRoles(req, res) {
    res.send({
      message: "route loaded"
    });
  }
};

module.exports = roleController;
