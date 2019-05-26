// database
const db = require("../../../../models");

// utils
const validateData = require("../../../utils/validateData");

// controllers
const roleController = {
  /**
   * @author oluwafemi akinwa
   * @desc gets all roles within the database
   * @param {object} req
   * @param {object} res
   */
  getAllRoles(req, res) {
    db.Role.findAll()
      .then(roles => {
        res.status(200).send({
          message: "You have successfully retrieved all roles.",
          roles
        });
      })
      .catch(err => {
        res.status(500).send({
          message: "An error has occurred",
          err
        });
      });
  },

  /**
   * @author oluwafemi akinwa
   * @desc creates a role
   * @param {object} req
   * @param {object} res
   */
  createRole(req, res) {
    const error = validateData.checkRoleData(req.body);
    if (error.error) {
      return res.status(400).send({
        message: "An error has occurred.",
        error
      });
    }

    // check if role already exist

    // creates role
    db.Role.create(req.body)
      .then(role => {
        return res.status(201).send({
          message: "Role created successfully",
          role
        });
      })
      .catch(err => {
        return res.status(500).send({
          message: "Role was not created",
          err
        });
      });
  }
};

module.exports = roleController;
