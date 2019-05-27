// database model
const db = require("../../../../models");

// utils
const validateData = require("../../../utils/validateData");

// controller
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

  /**
   * @desc registers a single car
   * @param {object} req
   * @param {object} res
   */
  registerCar(req, res) {
    const error = validateData.checkCarData(req.body);
    if (error.error) {
      return res.status(400).send({
        message: "An error has occurred.",
        error
      });
    }
    const { regNo } = req.body;
    db.Car.findOne({ where: { regNo } })
      .then(car => {
        if (car) {
          return res.status(403).send({
            message: `Car with reg. no: '${regNo}' already exist.`
          });
        }
        db.Car.create(req.body)
          .then(car => {
            return res.status(201).send({
              message: "Car registered successfully",
              car
            });
          })
          .catch(err => {
            return res.status(500).send({
              message: "An error has occurred. Car not registered",
              err
            });
          });
      })
      .catch(err => {
        return res.status(500).send({
          message: "An error has occured. Car was not registered",
          err
        });
      });
  },

  /**
   * @desc
   * @param {object} req
   * @param {object} res
   */
  updateCarDetails(req, res) {
    const { id } = req.params;
    const error = validateData.checkIdParams(id);
    if (error.error) {
      return res.status(400).send({
        message: "Car id is required & must be an integer",
        error
      });
    }
    db.Car.findOne({ where: { id } }).then(car => {
      if (!car) {
        return res.status(404).send({
          message: `Car details does not exist.`
        });
      }
      const validateErr = validateData.checkCarUpdateData(req.body);
      if (validateErr.error) {
        return res.status(400).send({
          message: "An error has occurred.",
          validateErr
        });
      }
      db.Car.update(req.body, { where: { id }, returning: true })
        .then(updatedCar => {
          return res.status(200).send({
            message: "Car details updated successfully",
            updatedCar
          });
        })
        .catch(err => {
          return res.status(500).send({
            message: "An error has occured. Car details was not updated.",
            err
          });
        });
    });
  },

  /**
   * @desc deletes car records
   * @param {object} req
   * @param {object} res
   */
  deleteCar(req, res) {
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
            message: `Car details does not exist.`
          });
        }
        const deleted = car;
        car.destroy();
        return res.status(200).send({
          message: "Car details deleted successfully",
          deleted
        });
      })
      .catch(err => {
        return res.status(500).send({
          message: "An error has occured. Car details not deleted.",
          err
        });
      });
  }
};

module.exports = carController;
