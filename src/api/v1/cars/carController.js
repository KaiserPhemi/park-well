// database model
const db = require("../../../../models");

// utils
const validateData = require("../../../utils/validateData");

const carController = {
  /**
   * @author oluwafemi akinwa
   * @desc retrieves all cars registered
   * @param {object} req
   * @param {object} res
   */
  getAllCars(req, res) {
    db.Car.findAll()
      .then(cars => {
        return res.status(200).send({
          message: "All cars retrieved successfully",
          cars
        });
      })
      .catch(err => {
        return res.status(500).send({
          message: "An error has occurred.",
          err
        });
      });
  },

  /**
   * @desc retrieves details of a car
   * @param {object} req
   * @param {object} res
   */
  getCar(req, res) {
    const { id } = req.params;
    const error = validateData.checkIdParams(id);
    if (error.error) {
      return res.status(400).send({
        message: "Car id is required & must be an integer",
        error
      });
    }
    db.Car.findOne({ where: { id } })
      .then(car => {
        if (!car) {
          return res.status(404).send({
            message: "Car details does not exist."
          });
        }
        return res.status(200).send({
          message: "Car details retrieved successfully.",
          car
        });
      })
      .catch(err => {
        return res.status(500).send({
          message: "An error has occurred.",
          err
        });
      });
  },

  registerCar(req, res) {},
  updateCarDetails() {},
  deleteCar() {}
};

module.exports = carController;
