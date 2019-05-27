// database model
const db = require("../../../../models");

// utils
const validateData = require("../../../utils/validateData");

// controller
const activityController = {
  /**
   * @desc retrieves all parking activities
   * @param {object} req
   * @param {object} res
   */
  getActivities(req, res) {
    db.ParkingActivity.findAll()
      .then(activities => {
        return res.status(200).send({
          message: "All parking activities retrieved successfully.",
          activities
        });
      })
      .catch(err => {
        return res.status(500).send({
          message: "Internal error occurred",
          err
        });
      });
  },

  /**
   * @desc
   * @param {object} req
   * @param {object} res
   */
  createActivity(req, res) {
    const err = validateData.checkActivityData(req.body);
    if (err.error) {
      return res.status(400).send({
        message: "Internal error occurred",
        err
      });
    }
    db.ParkingActivity.create(req.body)
      .then(activity => {
        return res.status(201).send({
          message: "Parking activity created successfully.",
          activity
        });
      })
      .catch(err => {
        return res.status(500).send({
          message: "Inernal error occurred",
          err
        });
      });
  },

  /**
   * @desc
   * @param {object} req
   * @param {object} res
   */
  updateActivity(req, res) {
    const { id } = req.params;
    const validationError = validateData.checkIdParams(id);
    if (validationError.error) {
      return res.status(400).send({
        message: "Role id is required & must be an integer",
        validationError
      });
    }
    db.ParkingActivity.findOne({ where: { id } })
      .then(activity => {
        if (!activity) {
          return res.status(404).send({
            message: `Activity does not exist.`
          });
        }
        db.ParkingActivity.update(req.body, { where: { id }, returning: true })
          .then(activity => {
            return res.status(200).send({
              message: "Activity updated successfully.",
              activity
            });
          })
          .catch(err => {
            return es.status(500).send({
              message: "An error has occured. Activity was not updated.",
              err
            });
          });
      })
      .catch(err => {
        return res.status(500).send({
          message: "An error has occured.",
          err
        });
      });
  }
};

module.exports = activityController;
