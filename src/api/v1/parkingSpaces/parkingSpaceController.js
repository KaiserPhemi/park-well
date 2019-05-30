// database model
const db = require("../../../../models");

// utils
const validateData = require("../../../utils/validateData");

const parkingSpaceController = {
  /**
   * @author oluwafemi akinwa
   * @desc retrieves all parking space registered
   * @param {object} req
   * @param {object} res
   */
  getParkingSpaces(req, res) {
    db.ParkingSpace.findAll()
      .then(spaces => {
        return res.status(200).send({
          message: "All parking spaces retrieved successfully",
          spaces
        });
      })
      .catch(err => {
        return res.status(500).send({
          message: "An error has occurred",
          err
        });
      });
  },

  /**
   * @desc registers a parking space
   * @param {object} req
   * @param {object} res
   */
  addParkingSpace(req, res) {
    const err = validateData.checkParkingSpaceData(req.body);
    if (err.error) {
      return res.status(400).send({
        message: "An error has occurred.",
        err
      });
    }
    const { title } = req.body;
    db.ParkingSpace.findOne({ where: { title } })
      .then(space => {
        if (space) {
          return res.status(403).send({
            message: `Parking space '${title}' already exist`
          });
        }
        db.ParkingSpace.create(req.body)
          .then(space => {
            return res.status(201).send({
              message: "Parking space registered successfully",
              space
            });
          })
          .catch(err => {
            return res.status(500).send({
              message: "Parking space not registered. An error occurred.",
              err
            });
          });
      })
      .catch(err => {
        return res.status(500).send({
          message: "An error occurred",
          err
        });
      });
  },

  /**
   * @desc
   * @param {object} req
   * @param {object} res
   */
  updateParkingSpace(req, res) {
    const { id } = req.params;
    const err = validateData.checkIdParams(id);
    if (err.error) {
      return res.status(400).send({
        message: "Space id is required",
        err
      });
    }
    db.ParkingSpace.findOne({ where: { id } })
      .then(space => {
        if (!space) {
          return res.status(404).send({
            message: "Parking space is not registered."
          });
        }
        db.ParkingSpace.update(req.body, { where: { id }, returning: true })
          .then(updatedSpace => {
            return res.status(200).send({
              message: "Parking space details updated successfully.",
              updatedSpace
            });
          })
          .catch(err => {
            return res.status(500).send({
              message: "An error has occured.",
              err
            });
          });
      })
      .catch(err => {
        return res.status(500).send({
          message: "An internal error has occured.",
          err
        });
      });
  }
};

module.exports = parkingSpaceController;
