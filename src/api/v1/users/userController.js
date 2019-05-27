// database model
const db = require("../../../../models");

// utils
const validateData = require("../../../utils/validateData");
const encrypt = require("../../../utils/encrypt");
const filterData = require("../../../utils/filterData");

const userController = {
  /**
   * @author oluwafemi akinwa
   * @desc retrieves all user
   * @param {object} req
   * @param {object} res
   */
  getAllUsers(req, res) {
    db.User.findAll()
      .then(users => {
        return res.status(200).send({
          message: "Users retrieved successfully.",
          users
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
   * @author oluwafemi akinwa
   * @desc creates a user
   * @param {object} req
   * @param {object} res
   */
  createUser(req, res) {
    const validationError = validateData.checkUserData(req.body);
    if (validationError.error) {
      return res.status(400).send({
        message: "An error has occurred.",
        validationError
      });
    }
    const { email } = req.body;
    db.User.findOne({ where: { email } })
      .then(user => {
        if (user) {
          return res.status(403).send({
            message: `User with email: '${email}' already exist.`
          });
        } else {
          db.User.create(filterData.encryptPassword(req.body))
            .then(user => {
              return res.status(201).send({
                message: "User created successfully",
                createdUser: filterData.filterUser(user)
              });
            })
            .catch(err => {
              return res.status(500).send({
                message: "An error has occurred. User not created.",
                err
              });
            });
        }
      })
      .catch(err => {
        return res.status(500).send({
          message: "An error has occurred. User not created.",
          err
        });
      });
  }
};

module.exports = userController;
