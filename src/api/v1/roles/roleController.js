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
    const { title } = req.body;
    db.Role.findOne({ where: { title } })
      .then(role => {
        if (role) {
          return res.status(403).send({
            message: `'${title}' role already exist`
          });
        } else {
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
      })
      .catch(err => {
        return res.status(500).send({
          message: "An error has occured. Role was not created",
          err
        });
      });
  },

  /**
   * @author oluwafemi akinwa
   * @desc updates a role
   * @param {object} req
   * @param {object} res
   */
  updateRole(req, res) {},

  /**
   * @author oluwafemi akinwa
   * @desc retrieves a role
   * @param {object} req
   * @param {object} res
   */
  getRole(req, res) {
    const { id } = req.params;
    const error = validateData.checkIdParams(id);
    if (error.error) {
      return res.status(400).send({
        message: "Role id is required & must be an integer",
        error
      });
    }
    db.Role.findOne({ where: { id } })
      .then(role => {
        if (!role) {
          return res.status(404).send({
            message: `Role with id: ${id} does not exist on the system`
          });
        }
        return res.status(200).send({
          message: "Role retrieved successfully.",
          role
        });
      })
      .catch(err => {
        return res.status(500).send({
          message: "An internal error has occured. Role not retrieved.",
          err
        });
      });
  },

  /**
   * @author oluwafemi akinwa
   * @desc deletes a role
   * @param {object} req
   * @param {object} res
   */
  deleteRole(req, res) {}
};

module.exports = roleController;
