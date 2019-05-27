// database model
const db = require("../../../../models");

const carController = {
  getAllCars(req, res) {
    res.send({
      message: "We got all cars"
    });
  }
};

module.exports = carController;
